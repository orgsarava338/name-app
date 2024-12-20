import mongoose from "mongoose";

export interface IMSession extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
}

export const sessionSchema = new mongoose.Schema<IMSession>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
