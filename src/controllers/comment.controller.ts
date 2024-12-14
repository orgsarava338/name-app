import { Comment } from "../db/models";

export async function getCommentsForName(nameId: string): Promise<IComment[]> {
  try {
    const comments = await Comment.find({ name: nameId });
    return comments as unknown as IComment[];
  } catch (error) {
    throw error;
  }
}

export async function postCommentforName(nameId: string, body: string) {
  try {
    await Comment.create({ name: nameId, body });
  } catch (error) {
    throw error;
  }
}
