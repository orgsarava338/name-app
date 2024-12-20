import { fetch } from "bun";
import Elysia from "elysia";
import { generateCodeVerifier, generateState, Google } from "arctic";

import { IUser } from "../../types/user";

import { createOrUpdateUser } from "../../controllers/auth.controller";

const google: Google = new Google(
  Bun.env.GOOGLE_OAUTH_CLIENT_ID!,
  Bun.env.GOOGLE_OAUTH_CLIENT_SECRET!,
  Bun.env.GOOGLE_OAUTH_REDIRECT_URL!
);

export default function googleAuthProvider(auth: Elysia) {
  auth.group("/google", (route) => {
    route.get("/login", (ctx) => {
      const { cookie } = ctx;

      const state = generateState();
      const codeVerifier = generateCodeVerifier();

      const url: URL = google.createAuthorizationURL(state, codeVerifier, [
        "openid",
        "profile",
      ]);

      cookie.google_state.set({
        value: state,
        httpOnly: true,
        sameSite: true,
        secure: Bun.env.ENV !== "LOCAL",
        // path: "/",
      });

      cookie.google_code_verifier.set({
        value: codeVerifier,
        httpOnly: true,
        sameSite: true,
        secure: Bun.env.ENV !== "LOCAL",
        // path: "/",
      });

      return ctx.redirect(url.toString());
    });

    route.get("/callback", async (ctx) => {
      try {
        const { query, cookie } = ctx;

        const stateCookie = cookie.google_state.value;
        const codeVerifierCookie = cookie.google_code_verifier.value;

        console.log("asll cookies", cookie);

        console.log("statecookie", stateCookie);
        console.log("codeVerifierCookie", codeVerifierCookie);
        console.log("query.state", query.state);
        console.log("query.code", query.code);

        // statecookie undefined
        // codeVerifierCookie undefined
        // query.state vQbOyXLVd32PEa2kgDw1cqQhIELBxkUcQ4N7YXu1OuE
        // query.code 4/0AanRRrtPrbnFa-QtbOz5oTEUmfwCKCI0cA41HbR1HMUblwbMXlnhsDTBjcgMBPfQ6_rdIA
        // no google state

        if (
          !stateCookie ||
          !codeVerifierCookie ||
          !query.state ||
          !query.code
        ) {
          console.log("no google state");
          return (ctx.set.status = 400);
        }

        if (query.state !== stateCookie) {
          console.log("state invalid");
          return (ctx.set.status = 400);
        }

        const token = await google.validateAuthorizationCode(
          query.code!,
          codeVerifierCookie!
        );

        const userDetailResponse = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `${token.tokenType()} ${token.accessToken()}`,
            },
          }
        );

        const userDetails = await userDetailResponse.json();

        // console.log("google res", userDetails);

        const userData: IUser = {
          google_id: userDetails.id as string,
          name: userDetails.name as string,
          firstName: userDetails.given_name as string,
          lastName: userDetails.family_name as string,
          imageUrl: userDetails.picture as string,
        };

        const user = (await createOrUpdateUser(userData)) as IUser;

        // console.log(user);

        return user;
      } catch (error) {
        console.log(error);
        return error;
      }
    });

    return route;
  });

  return auth;
}
