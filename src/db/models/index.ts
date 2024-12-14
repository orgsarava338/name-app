import mongoose from "mongoose";

import { IMUser, userSchema } from "./User";
import { IMName, nameSchema } from "./Name";
import { IMTag, tagSchema } from "./Tag";
import { categorySchema, IMCategory } from "./Category";
import { commentSchema, IMComment } from "./Comment";

const User = mongoose.model<IMUser>("User", userSchema);
const Name = mongoose.model<IMName>("Name", nameSchema);
const Tag = mongoose.model<IMTag>("Tag", tagSchema);
const Comment = mongoose.model<IMComment>("Comment", commentSchema);
const Category = mongoose.model<IMCategory>("Category", categorySchema);

export { User, Name, Tag, Category, Comment };
