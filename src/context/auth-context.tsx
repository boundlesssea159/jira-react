import React, {ReactNode, useContext, useState} from "react";

import {User} from "../screens/project-list/list";
import * as auth from "auth-provider"
import {getUserToke} from "auth-provider";

export const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined);

interface AuthForm {
    username: string,
    password: string
}

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>({id: "", name: "", token: getUserToke() ?? ""})
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("AuthContext未被初始化")
    }
    return context
}