import { Alert, Spinner } from "react-bootstrap"
import { useCommentContext } from "../context/CommentContext"

export default function CommentSection() {

  const { commentError, isCommentLoading, comments } = useCommentContext()

  return (
    <>
      <h2>All Comments</h2>
      {commentError && <Alert variant="danger">{commentError}</Alert>}
      {isCommentLoading && <Spinner />}

      {comments}
    </>
  )
}