interface IComment implements INewComment {
    _id?: string
    content: string
    replies?: IComment[]
}

interface ICommentRequest {
    nameId: string
    commentId?: string
    content: string
}

interface ICommentContext {
    comments: IComment[]
    isCommentLoading: boolean
    commentError: string

    addNewComment: (commentPostRequest: ICommentRequest) => void
    replyComment: (commentReplyRequest: ICommentRequest) => void
    updateComment: (commentUpdateRequest: ICommentRequest) => void
    deleteComment: (commentDeleteRequest: ICommentRequest) => void
}