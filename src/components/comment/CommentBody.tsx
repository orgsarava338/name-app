import { Html } from "@elysiajs/html";

interface IProps {
  comment: IComment;
}

export default function CommentBody({ comment }: IProps) {
  return (
    <div class="m-2">
      <p>{comment.author}</p>
      <p>{comment.body}</p>

      {comment.replies?.map((reply) => (
        <CommentBody comment={reply} />
      ))}
    </div>
  );
}
