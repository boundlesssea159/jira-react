import {User} from "./screens/project-list/list";

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
