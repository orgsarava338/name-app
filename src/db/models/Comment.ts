import mongoose from "mongoose";
import { IMName } from "./Name";
import { IMUser } from "./User";

export interface IMComment extends mongoose.Document {
  body: string;
  name: mongoose.Schema.Types.ObjectId | IMName;
  author: mongoose.Schema.Types.ObjectId | IMUser;
  parent: mongoose.Schema.Types.ObjectId | IMComment;
  active: boolean;
}

export const commentSchema = new mongoose.Schema<IMComment>(
  {
    body: { type: String, required: true },
    name: { type: mongoose.Schema.Types.ObjectId, ref: "Name", required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
