import mongoose from "mongoose";
import { Role } from "../../types/enums";

export interface IMUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  active: boolean;
}

export const userSchema = new mongoose.Schema<IMUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
