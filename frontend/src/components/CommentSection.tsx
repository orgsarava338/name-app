import { Alert, Spinner } from "react-bootstrap"
import { useCommentContext } from "../context/CommentContext"
import CommentBox from "./CommentBox"
import { useState } from "react"
import CommentInput from "./comment/CommentInput"

export default function CommentSection() {

  const [commentBody, setCommentBody] = useState('')

  const { commentError, isCommentLoading, comments, addNewComment } = useCommentContext()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(commentBody) addNewComment({ body: commentBody } as ICommentRequest)
    !commentError && setCommentBody('')
  }

  return (
    <>
      <h2>All Comments</h2>
      {commentError && <Alert variant="danger">{commentError}</Alert>}
      {isCommentLoading && <Spinner />}

      <CommentInput 
        type="addComment" 
        commentBody={commentBody} 
        setCommentBody={setCommentBody} 
        handleSubmit={handleSubmit}
      />

      {
        !comments.length 
          ? <p>new to comment !</p>
          : (comments.map(comment => <CommentBox key={comment._id} comment={comment} />))
      }
    </>
  )
}