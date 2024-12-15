import { Permission, Role } from "../types/enums";

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.USER]: [Permission.comment],

  [Role.MOD]: [
    Permission.readProfile,
    Permission.comment,
    Permission.manageComments,
    Permission.manageCategories,
    Permission.manageTags,
    Permission.manageNames,
  ],

  [Role.ADMIN]: [
    Permission.readProfile,
    Permission.comment,
    Permission.manageComments,
    Permission.manageCategories,
    Permission.manageTags,
    Permission.manageNames,
    Permission.manageUsers,
  ],
};
