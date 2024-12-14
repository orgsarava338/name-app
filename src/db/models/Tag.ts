import mongoose from "mongoose";
import { IMName } from "./Name";

export interface IMTag extends mongoose.Document {
  name: string;
  description: string;
  names: mongoose.Schema.Types.ObjectId[] | IMName[];
  active: boolean;
}

export const tagSchema = new mongoose.Schema<IMTag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    names: [{ type: mongoose.Schema.Types.ObjectId, ref: "Name", default: [] }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
