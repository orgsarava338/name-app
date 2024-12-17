import Elysia from "elysia";

import { IName } from "../types/name";
import { nameCreateSchema } from "../schemas/name.schema";

import {
  createName,
  updateNameById,
  deleteNameById,
} from "../controllers/name.controller";

export default function nameRoutes(app: Elysia) {
  app.group("/name", (route) => {
    route.post(
      "/",
      async (ctx) => {
        try {
          const name = {
            ...ctx.body,
            author: "6738ea17bddd664ca1ef65c6",
          } as IName;

          await createName(name);
          return `name ${name.name} created successfully`;
        } catch (error) {
          throw error;
        }
      },
      nameCreateSchema
    );

    route.delete("/:id", async (ctx) => {
      try {
        await deleteNameById(ctx.params.id);
      } catch (error) {
        throw error;
      }
    });

    route.put("/:id", async (ctx) => {
      try {
        await updateNameById(ctx.params.id, ctx.body as IName);
      } catch (error) {
        throw error;
      }
    });

    return route;
  });

  return app;
}
