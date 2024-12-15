import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import { html, Html } from "@elysiajs/html";

import connectToDataBase from "./db/mongoose";

import apiRoutes from "./routes/api.routes";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import namePages from "./pages/name.pages";

async function startApplication() {
  await connectToDataBase();

  const app = new Elysia()
    .use(html())
    .use(staticPlugin())

    .use(apiRoutes)

    .get("/", () => <HomePage />,)
    .get("/about", () => <AboutPage />)
    .get("/contact", () => <ContactPage />)

    .use(namePages);

  app.listen(Bun.env.PORT!, () => {
    console.log(`Server running`);
  });
}

startApplication();
