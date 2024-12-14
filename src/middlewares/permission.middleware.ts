import { RolePermissions } from "../utils/role.permission";
import { Permission, Role } from "../types/enums";
import { permissionSchema } from "../schemas/permission.schema";

export const hasPermission = (requiredPermission: Permission) => {
  return ({ store }: any) => {
    const validatedStore = permissionSchema.parse(store);

    const userRole = validatedStore.user?.role || Role.USER; // Default role is `USER`
    const permissions = RolePermissions[userRole as Role];

    if (!permissions.includes(requiredPermission)) {
      throw new Error("Access Denied: Insufficient permissions");
    }
  };
};
