import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import { html, Html } from "@elysiajs/html";

import connectToDataBase from "./db/mongoose";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import namePages from "./pages/name.pages";
import apiRoutes from "./routes/api.routes";

async function startDB() {
  await connectToDataBase();

  const app = new Elysia()
    .use(staticPlugin())
    .use(html())

    .use(apiRoutes)

    .get("/peyar_logo.svg", async () => {
      const peyarLogo = Bun.file("./public/peyar_logo.svg");

      return new Response(peyarLogo, {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      });
    })

    .get("/", () => <HomePage />)
    .get("/about", () => <AboutPage />)
    .get("/contact", () => <ContactPage />)

    .use(namePages);

  app.listen(8070, () => {
    console.log(`Server running on ${Bun.env.SERVER}`);
  });
}

startDB();
