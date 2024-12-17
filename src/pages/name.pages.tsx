import Elysia from "elysia";
import { Html } from "@elysiajs/html";

import {
  getAllNames,
  getNameByname,
  getNameToEdit,
} from "../controllers/name.controller";

import NamePage from "./name/NamePage";
import NamesPage from "./name/NamesPage";
import NameCreatePage from "./name/NameCreatePage";
import NameEditPage from "./name/NameEditPage";
import { IName } from "../types/name";

export default function namePages(app: Elysia) {
  app.group("/name", (route) =>
    route
      .get("/create", async (ctx) => <NameCreatePage />)

      .get("/", async (ctx) => {
        try {
          const names: IName[] = await getAllNames();
          return <NamesPage names={names} />;
        } catch (err) {
          const error = err as Error;
          ctx.error(400);
          return <section>Error loading names: {error.message}</section>;
        }
      })

      .get("/:name", async (ctx) => {
        try {
          const name = await getNameByname(ctx.params.name);
          return <NamePage name={name} />;
        } catch (err) {
          const error = err as Error;
          console.log(error);
          ctx.error(400);
          return <section>Error loading name: {error.message}</section>;
        }
      })

      .get("/:name/edit", async (ctx) => {
        try {
          const name = await getNameToEdit(ctx.params.name);
          return <NameEditPage name={name} />;
        } catch (err) {
          const error = err as Error;
          console.log(error);
          ctx.error(400);
          return <section>Error updating name: {error.message}</section>;
        }
      })
  );

  return app;
}
