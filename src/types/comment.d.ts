interface IComment {
  _id: string;
  body: string;
  name?: string;
  author?: string;
  parent?: string;
  active?: boolean;
  replies?: IComment[];
}
