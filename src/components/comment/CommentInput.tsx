import { Html } from "@elysiajs/html";

interface IProps {
  nameId: string;
}

export default function CommentInput({ nameId }: IProps) {
  return (
    <form hx-post={`/api/comment/${nameId}`}>
      <input
        name="body"
        id="comment-input"
        placeholder="Add your comment !"
      ></input>
    </form>
  );
}
