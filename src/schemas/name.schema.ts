import { t } from "elysia";

import { Gender } from "../types/enums";

export const nameCreateSchema = {
  body: t.Object({
    name: t.String(),
    nameInEnglish: t.String(),
    gender: t.Enum(Gender),
    description: t.String(),
    literatureEvidence: t.Optional(t.String()),
    epigraphEvidence: t.Optional(t.String()),
    tags: t.Optional(t.Array(t.String())),
    categories: t.Optional(t.Array(t.String())),
  }),

  store: t.Object({
    user: t.Object({
      _id: t.String(),
    }),
  }),

  // cookie: t.Cookie({}),
};

export const namePageUpdateSchema = {
  params: t.Object({
    name: t.String(),
  }),

  body: t.Object({
    gender: t.Optional(t.String()),
    description: t.Optional(t.String()),
    literatureEvidence: t.Optional(t.String()),
    epigraphEvidence: t.Optional(t.String()),
    tags: t.Optional(t.Array(t.String())),
    categories: t.Optional(t.Array(t.String())),
  }),

  // cookie: t.Cookie({}),
};
