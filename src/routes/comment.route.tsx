import Elysia, { t } from "elysia";
import { Html } from "@elysiajs/html";

import {
  getCommentsForName,
  postCommentforName,
} from "../controllers/comment.controller";

import CommentSection from "../components/comment/CommentSection";

export default function commentRoutes(app: Elysia) {
  app.group("/comment", (route) => {
    route.get("/:nameId", async (ctx) => {
      const comments = await getCommentsForName(ctx.params.nameId);
      return <CommentSection comments={comments} nameId={ctx.params.nameId} />;
    });

    route.post(
      "/:nameId",
      async (ctx) => {
        await postCommentforName(ctx.params.nameId, ctx.body.body);
      },
      {
        body: t.Object({
          body: t.String(),
        }),
      }
    );

    return route;
  });

  return app;
}
