import { Gender } from "./enums";

export interface IName {
  _id: string;
  name: string;
  nameInEnglish: string;
  gender: Gender;
  description: string;
  author: string;
  literatureEvidence?: string;
  epigraphEvidence?: string;
  relatedNames?: IName[];
  categories?: ICategory[];
  tags?: ITag[];
  active?: boolean;
  comments?: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}
