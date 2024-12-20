import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import { html, Html } from "@elysiajs/html";

import connectToDataBase from "./db/mongoose";

import apiRoutes from "./routes/api.routes";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import HealthCheckPage from "./pages/HealthCheckPage";

import authPages from "./pages/auth/auth.pages";
import namePages from "./pages/name/name.pages";

async function startApplication() {
  await connectToDataBase();

  const app = new Elysia()
    .use(html())
    .use(staticPlugin())

    .use(apiRoutes)

    .get("/", (ctx) => ctx.html(<HomePage />))
    .get("/about", (ctx) => ctx.html(<AboutPage />))
    .get("/contact", (ctx) => ctx.html(<ContactPage />))
    .get("/healthz", (ctx) => ctx.html(<HealthCheckPage />))

    .use(authPages)
    .use(namePages);

  app.listen(Bun.env.PORT!, () => {
    console.log(`Server running`);
  });
}

startApplication();
