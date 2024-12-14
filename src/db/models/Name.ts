import mongoose from "mongoose";

import { Gender } from "../../types/enums";

import { IMTag } from "./Tag";
import { IMCategory } from "./Category";
import { IMUser } from "./User";
import { IMComment } from "./Comment";

export interface IMName extends mongoose.Document {
  name: string;
  nameInEnglish: string;
  gender: Gender;
  description: string;
  literatureEvidence?: string;
  epigraphEvidence?: string;
  relatedNames: mongoose.Schema.Types.ObjectId[] | IMUser[];
  comments: mongoose.Schema.Types.ObjectId[] | IMComment[];
  categories: mongoose.Schema.Types.ObjectId[] | IMCategory[];
  tags: mongoose.Schema.Types.ObjectId[] | IMTag[];
  author: mongoose.Schema.Types.ObjectId | IMUser;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const nameSchema = new mongoose.Schema<IMName>(
  {
    name: { type: String, required: true, unique: true },
    nameInEnglish: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(Gender) },
    description: { type: String, required: true },
    literatureEvidence: { type: String },
    epigraphEvidence: { type: String },
    relatedNames: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Name", default: [] },
    ],
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
    ],
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", default: [] }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
