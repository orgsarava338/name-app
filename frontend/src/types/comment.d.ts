interface IComment {
    _id?: string
    body: string
    user: {
        username: string
        email: string
        _id: string
    }
    replies: IComment[],
}

interface ICommentRequest {
    commentId?: string
    body: string
}

interface ICommentContext {
    comments: IComment[]
    isCommentLoading: boolean
    commentError: string

    addNewComment: (commentPostRequest: ICommentRequest) => void
    replyComment: (commentReplyRequest: ICommentRequest) => void
    updateComment: (commentUpdateRequest: ICommentRequest) => void
    deleteComment: (commentId: string) => void
}