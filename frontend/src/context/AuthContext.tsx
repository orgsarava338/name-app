import { createContext, useContext, useState } from "react";
import api from "../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface iProps {
    children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | null>(null)

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    if(authContext == null) throw new Error('auth context must be used inside AUth Provider')
    return authContext
}

export default function AuthProvider({children}: iProps) {
    
    const [user, setUser] = useState<IUser | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()

    const signupMutation = useMutation({
        mutationFn: async (signupCredential: ISignup) => {
            setIsLoading(true)
            setError(null)
            const { data } = await api.post('/auth/register', signupCredential)
            return data.data
        },

        onSuccess: (data: IUser) => {
            setUser(data)
            setIsLoading(false)
        },

        onError: (error: Error) => {
            setError(error.message || 'signup failed')
            setIsLoading(false)
        }
    })

    const loginMutation = useMutation({
        
        mutationFn: async (loginCredential: ILogin) => {
            setIsLoading(true)
            setError(null)
            const { data } = await api.post('/auth/login', loginCredential)
            return data.data
        }, 

        onSuccess: (data: IUser) => {
            setUser(data)
            setIsLoading(false)
        },

        onError: (error: Error) => {
            setError(error.message || 'login failed')
            setIsLoading(false)
        }
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            setError(null)
            queryClient.clear()
            await api.post('/auth/logout')
        },

        onSuccess: () => {
            setUser(null)
            setIsLoading(false)
        },

        onError: (error: Error) => {
            setError(error.message || 'logout failed')
            setIsLoading(false)
        }
    })

    const signup = (signupCredential: ISignup) => signupMutation.mutate(signupCredential)
    const login = (loginCredential: ILogin) => loginMutation.mutate(loginCredential)
    const logout = () => logoutMutation.mutate()

    const value: IAuthContext = {
        signup, login, logout,
        user: user,
        isAdmin: user?.isAdmin || false,
        isLoading,
        error: error ? error : '',
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
