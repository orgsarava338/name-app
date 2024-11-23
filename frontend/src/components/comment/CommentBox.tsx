import { useState } from "react"
import { Button, Stack } from "react-bootstrap"

import { useCommentContext } from "../../context/CommentContext"
import CommentInput from "./CommentInput"

interface IProps {
  comment: IComment
}
export default function CommentBox({ comment }: IProps) {

  const [isEdit, setIsEdit] = useState(false)
  const [editBody, setEditBody] = useState(comment.body)

  const [isReply, setIsReply] = useState(false)
  const [replyBody, setReplyBody] = useState('')

  const { updateComment, deleteComment, replyComment } = useCommentContext()

  const handleEdit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isEdit && editBody && editBody != comment.body) 
      updateComment({commentId: comment._id as string, body: editBody})

    setEditBody(comment.body)
    setIsEdit(false)
  }

  const handleDelete = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    deleteComment(comment._id as string)
  }

  const handleReply = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isReply && replyBody) 
      replyComment({commentId: comment._id, body: replyBody})

    setReplyBody('')
    setIsReply(false)
  }
    
  return (
    <div className="m-3 p-2 border">
      <div>
        <Stack direction="horizontal" gap={2}>
          <span>
            {comment.user.username} :{" "}
              {
                isEdit 
                  ? <CommentInput 
                      type="editComment" 
                      commentBody={editBody} 
                      setCommentBody={setEditBody} 
                      handleSubmit={handleEdit}
                    />
                  : comment.body
              }
          </span>

          <div className="ms-auto">
            <Button size="sm" variant={isEdit ? 'primary' : 'link'} onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'cancel' : 'edit'}</Button>
            <Button size="sm" variant="danger" onClick={handleDelete}>delete</Button>
          </div>
        </Stack>

        { 
          isReply && 
          <CommentInput 
            type="replyComment" 
            commentBody={replyBody} 
            setCommentBody={setReplyBody} 
            handleSubmit={handleReply} 
          />
        }

        <Button size="sm"
          variant={isReply ? 'primary' : 'link'} 
          onClick={() => setIsReply(!isReply)}
        >
          {isReply ? 'cancel' : 'reply'}
        </Button>
      </div>
      {
        comment.replies.map(reply => 
          <CommentBox key={reply._id} comment={reply}/>
        )
      }
    </div>
  )
}