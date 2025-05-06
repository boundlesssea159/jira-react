import React, {ReactNode, useContext, useEffect} from "react";
import {Spin} from "antd";
import * as auth from "auth-provider"
import {getUser, User} from "auth-provider";
import {useAsync} from "../utils/use-async";
import {useQueryClient} from "react-query";

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
    const {run, isLoading, error, data: user, setData: setUser} = useAsync<User>()

    const queryClient = useQueryClient();

    useEffect(() => {
        run((async () => {
            return {id: "", name: getUser().name ?? "", token: getUser().token ?? ""}
        })())
    }, [run])

    // during the time of fetching user data , show the waiting page
    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Spin>加载中...</Spin>
        </div>
    }

    // when throw Error, will show the default Error page by ReactErrorBoundary
    if (error !== null) {
        throw new Error(error.message)
    }

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user)).catch((error) => Promise.reject(error))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user)).catch((error) => Promise.reject(error))
    const logout = () => auth.logout().then(() => {
        queryClient.clear()
        setUser(null)
    }).catch((error) => Promise.reject(error))

    return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("AuthContext未被初始化")
    }
    return context
}