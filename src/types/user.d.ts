import { Role } from "./enums";

interface IUser {
  _id?: string;
  google_id: string;
  name: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role?: Role;
  active?: boolean;
}
