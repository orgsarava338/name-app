import mongoose from "mongoose";
import { IMName } from "./Name";

export interface IMCategory extends mongoose.Document {
  name: string;
  description: string;
  names: mongoose.Schema.Types.ObjectId[] | IMName[];
  active: boolean;
}

export const categorySchema = new mongoose.Schema<IMCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    names: [{ type: mongoose.Schema.Types.ObjectId, ref: "Name", default: [] }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);