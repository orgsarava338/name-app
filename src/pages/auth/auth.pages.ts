import Elysia from "elysia";
import googleAuthProvider from "./google.auth";

export default function authPages(app: Elysia) {
  app.group("/auth", (auth) => auth.use(googleAuthProvider));

  return app;
}
