import {User} from "./screens/project-list/list";
import qs from "qs";

const localStorageKey = "__auth_provider_token__";

const serviceUrl = process.env.REACT_APP_API_URL


export const getUserToke = () => {
    return window.localStorage.getItem(localStorageKey)
}

export const setUserTokenToLocalStorage = ({user}: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "")
    return user
}

export const login = (data: { username: string, password: string }) => {
    return fetch(`${serviceUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        if (response.ok) {
            return setUserTokenToLocalStorage(await response.json())
        }
        return Promise.reject(data)
    }).catch(error => {
        console.log(error)
        return Promise.reject(error)
    })
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${serviceUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async response => {
        if (response.ok) {
            return setUserTokenToLocalStorage(await response.json())
        }
        return Promise.reject(data)
    }).catch(error => {
        console.log(error)
        return Promise.reject(error)
    })
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
    return fetch(`${serviceUrl}/${endPoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await logout();
                window.location.reload();
                return Promise.reject({message: "请重新登录"})
            }
            const data = await response.json();
            if (response.ok) {
                return Promise.resolve(data);
            }
            return Promise.reject(data);
        })
}