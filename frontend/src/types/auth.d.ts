interface IUser {
    isAdmin: boolean
    username: string
    email: string
}

interface ILogin {
    emailOrUsername: string
    password: string
}

interface ISignup {
    email: string
    username: string
    password: string
}

interface IAuthContext {
    signup: (signupCredential: ISignup) => void
    login: (loginCredential: ILogin) => void
    logout: () => void
    user: IUser | null
    isAdmin: boolean
    isLoading: boolean
    error: string
}