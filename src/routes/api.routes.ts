import Elysia from "elysia";

import categoryRoutes from "./category.route";
import nameRoutes from "./name.route";
import commentRoutes from "./comment.route";

export default function apiRoutes(app: Elysia) {
  app.group("/api", (route) => {
    route.use(categoryRoutes);
    route.use(nameRoutes);
    route.use(commentRoutes);
    return route;
  });

  return app;
}
