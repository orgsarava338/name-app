import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

interface IProps {
    children: React.ReactNode
    nameId: string
}

const CommentContext = createContext<ICommentContext | null>(null)

export const useCommentContext = () => {
    const commentContext = useContext(CommentContext)
    if(!commentContext) throw new Error('comment context must be used inside Comment Provider')
    return commentContext
}

export default function CommentProvider({children, nameId}: IProps) {
    
    const [comments , setComments] = useState<IComment[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()

    const { data, isLoading: isFetching, error: fetchError } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
          const { data } = await api.get(`/comment/${nameId}`);
          console.log('loadComments', data.data)
          return data.data;
        },
    });

    const addNewCommentMutation = useMutation({
        mutationFn: async ({ body }: ICommentRequest) => {
            setIsLoading(true)
            setError(null)

            const { data } = await api.post(`/comment/${nameId}`, { body })
            console.log('addComment', data.data)
            return data.data
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']});
            setError(null)
            setIsLoading(false)
        }, 
        onError: (error: Error) => {
            setError(error.message)
            setIsLoading(false)
        }
    })

    const replyCommentMutation = useMutation({
        mutationFn: async ({ commentId, body } : ICommentRequest) => {
            if(!commentId) throw new Error('commentId required')
            setIsLoading(true)
            const { data } = await api.post(`/comment/reply/${commentId}`, {nameId, body})
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']});
            setError(null)
            setIsLoading(false)
        }, 
        onError: (error: Error) => {
            setError(error.message)
            setIsLoading(false)
        }
    })

    const updateCommentMutation = useMutation({
        mutationFn: async ({ commentId, body } : ICommentRequest) => {
            setIsLoading(true)
            if(!commentId) {
                setError('commentId must be passed')
                throw new Error('commentId must be passed')
            }
            const { data } = await api.put(`/comment/${commentId}`, {body})
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']});
            setError(null)
            setIsLoading(false)
        }, 
        onError: (error: Error) => {
            setError(error.message)
            setIsLoading(false)
        }
    })

    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId : string) => {
            setIsLoading(true)
            await api.delete(`/comment/${commentId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']});
            setError(null)
            setIsLoading(false)
        }, 
        onError: (error: Error) => {
            setError(error.message)
            setIsLoading(false)
        }
    })

    useEffect(() => {
        console.log('nameId', nameId)
    }, [nameId])

    useEffect(() => {
        if(data) setComments(data)
    }, [data]);

    const addNewComment = (commentPostRequest: ICommentRequest) => addNewCommentMutation.mutate(commentPostRequest)
    const replyComment = (commentReplyRequest: ICommentRequest) => replyCommentMutation.mutate(commentReplyRequest)
    const updateComment = (commentUpdateRequest: ICommentRequest) => updateCommentMutation.mutate(commentUpdateRequest)
    const deleteComment = (commentId: string) => deleteCommentMutation.mutate(commentId)

    const value: ICommentContext = {
        comments: data || comments, 
        isCommentLoading: isFetching || isLoading,
        commentError: fetchError?.message || (error ? error : ''),
        
        addNewComment,
        replyComment,
        updateComment,
        deleteComment,
    }

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    )
}