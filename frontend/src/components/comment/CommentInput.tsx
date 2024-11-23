import { Button, Form, FormControl, FormLabel, Stack } from "react-bootstrap";

interface IProps {
    type: 'addComment' | 'replyComment' | 'editComment'
    commentBody: string,
    setCommentBody: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
}

export default function CommentInput({ type, commentBody, setCommentBody, handleSubmit }: IProps) {
  return (
    <Form onSubmit={handleSubmit}>
        <Stack direction="horizontal" gap={3}>
          <FormLabel htmlFor={type}></FormLabel>
          <FormControl as='textarea' name={type} placeholder="Go ahead! share your thoughts!"
            value={commentBody} onChange={(e) => setCommentBody(e.target.value)}
          />
          <Button type="submit">submit</Button>
        </Stack>
    </Form>
  )
}