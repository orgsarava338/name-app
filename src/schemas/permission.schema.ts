import { t } from "elysia";

import { Role } from "../types/enums";

export const permissionSchema = t.Object({
  user: t.Optional(t.Object({ role: t.Enum(Role) })),
});
