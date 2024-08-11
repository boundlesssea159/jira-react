import React, {useState} from "react";

import * as auth from "auth-provider"
import {User} from "../screens/project-list/list";

// 定义一个全局的上下文context
const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);

AuthContext.displayName = "AuthContext";

interface AuthForm {
    username: string,
    password: string
}
// 定义一个context的provider：凡是该provider的子组件都可以通过useContext(AuthContext)拿到context
export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))
    return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}