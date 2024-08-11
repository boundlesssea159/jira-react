import {User} from "./screens/project-list/list";

const localStorageKey = "__auth_provider_token__";

const serviceUrl = process.env.REACT_APP_API_URL

export const getToke = () => {
    return window.localStorage.getItem(localStorageKey)
}

export const handleUserResponse = ({user}: { user: User }) => {
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
            return handleUserResponse(await response.json())
        }
        return Promise.reject(data)
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
            return handleUserResponse(await response.json())
        }
       return Promise.reject(data)
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
