import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Spin} from "antd";
import {User} from "../screens/project-list/list";
import * as auth from "auth-provider"
import {getUser} from "auth-provider";

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
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // show the loading page firstly, then show the main page after loading user data finish
        setTimeout(() => {
            setUser({id: "", name: getUser().name ?? "", token: getUser().token ?? ""})
        }, 0)
    }, [])

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user)).catch((error) => Promise.reject(error))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user)).catch((error) => Promise.reject(error))
    const logout = () => auth.logout().then(() => setUser(null)).catch((error) => Promise.reject(error))

    // show the default loading page when fetch user data slowly
    if (user === null) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Spin/>
        </div>
    }

    return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("AuthContext未被初始化")
    }
    return context
}