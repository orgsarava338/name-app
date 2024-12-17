import { Html } from "@elysiajs/html";

import CommentInput from "./CommentInput";
import CommentBody from "./CommentBody";

interface IProps {
  comments?: IComment[];
  nameId: string;
}

export default function CommentSection({ comments, nameId }: IProps) {
  return (
    <section id="comment-section">
      <h3>Comment Section</h3>

      <CommentInput nameId={nameId} />

      {comments?.length ? (
        comments.map((comment) => <CommentBody comment={comment} />)
      ) : (
        <p>You are the first one to comment !</p>
      )}
    </section>
  );
}
