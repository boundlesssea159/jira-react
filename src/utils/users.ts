import {useQuery} from "react-query";
import {User} from "../auth-provider";

const serviceUrl = process.env.REACT_APP_API_URL

export const useUsers = () => {
    const {data = [], isLoading, error} = useQuery<User[], Error>('users', () => {
            return fetch(`${serviceUrl}/users`).then(async response => {
                if (response.ok) {
                    return await response.json() as User[]
                }
                return []
            })
        },
        {
            initialData: []
        })
    return {
        isLoading,
        error,
        data
    }
}