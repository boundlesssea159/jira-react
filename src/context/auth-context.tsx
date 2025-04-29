import React, {ReactNode, useEffect} from "react";
import {Spin} from "antd";
import {getUser} from "auth-provider";
import {useAsync} from "../utils/use-async";
import {useDispatch, useSelector} from "react-redux";
import {authUserSelector, loginThunk, logoutThunk, registerThunk, setUser} from "../store/auth.slice";

export interface User {
    id: string,
    name: string,
    token: string,
}

React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined);

export interface AuthForm {
    username: string,
    password: string
}

export const UserInitializer = ({children}: { children: ReactNode }) => {
    const {run, isLoading, error, data: user} = useAsync<User>()
    const dispatch = useDispatch()

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

    dispatch(setUser(user))
    return <>
        {children}
    </>
}

export const useAuth = () => {
    const dispatch = useDispatch()
    const login = (form: AuthForm) => loginThunk(form)(dispatch)
    const register = (form: AuthForm) => registerThunk(form)(dispatch)
    const logout = () => logoutThunk()(dispatch)

    return {
        user: useSelector(authUserSelector),
        login,
        register,
        logout,
    }
}