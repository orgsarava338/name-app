import Elysia, { t } from "elysia";

import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";

export default function categoryRoutes(app: Elysia) {
  app.group("/category", (route) => {
    route.get("/", async (ctx) => {
      try {
        const categories = await getAllCategories(ctx.query?.name);
        return categories;
      } catch (error) {
        throw error;
      }
    });

    route.post(
      "/",
      async (ctx) => {
        try {
          const categoy = await createCategory(
            ctx.body.name,
            ctx.body.description
          );
          return categoy;
        } catch (error) {
          throw error;
        }
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.Optional(t.String()),
        }),
      }
    );

    return route;
  });

  return app;
}
