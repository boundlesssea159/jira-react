import React from "react";
import {User} from "./screens/project-list/list";
import qs from "qs";
import {useAuth} from "./context/auth-context";


const localStorageKey = "__auth_provider_token__";

const serviceUrl = process.env.REACT_APP_API_URL


export const getUserToke = () => {
    return window.localStorage.getItem(localStorageKey)
}

export const setUserTokenToLocalStorage = ({user}: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "")
    return user
}

export const login = async (data: { username: string, password: string }) => {
    return initUser("/login", data)
}

export const register = (data: { username: string, password: string }) => {
    return initUser("/register", data)
}

export const initUser = async (endpoint: string, account: { username: string, password: string }) => {
    const result = await query(endpoint, {
        data: {
            username: account.username,
            password: account.password
        }
    });
    if (result.user.token !== "") {
        return setUserTokenToLocalStorage(result)
    }
    return Promise.reject(result)
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)

interface QueryParam extends RequestInit {
    data?: Object
    token?: string
}

export const query = (endPoint: string, {data, token, ...customConfig}: QueryParam) => {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': data ? 'application/json' : "",
            'Authorization': token ? `Bearer ${token}` : ""
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === "GET") {
        endPoint += '?' + qs.stringify(data)
    } else {
        config.body = JSON.stringify(data || {})
    }
    return fetch(`${serviceUrl}${endPoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await logout();
                window.location.reload();
                return Promise.reject({message: "请重新登录"})
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            }
            return Promise.reject(data);
        })
}

export const useQueryWithToken = () => {
    const context = useAuth();
    return (...[endPoint, param]: Parameters<typeof query>) => query(endPoint, {...param, token: context.user?.token})
}
