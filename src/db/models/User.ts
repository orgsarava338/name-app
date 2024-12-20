import mongoose from "mongoose";
import { Role } from "../../types/enums";

export interface IMUser extends mongoose.Document {
  google_id: string;
  name: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: Role;
  active: boolean;
}

export const userSchema = new mongoose.Schema<IMUser>(
  {
    google_id: { type: String, unique: true },
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
