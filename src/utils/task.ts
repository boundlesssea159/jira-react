import {useQuery} from "react-query";
import {Task} from "../types/task";

const serviceUrl = process.env.REACT_APP_API_URL
export const useTasks = () => {
    const {data, isLoading, error} = useQuery<Task[], Error>(["tasks"], () => {
        return fetch(`${serviceUrl}/tasks?}`)
            .then(async response => {
                if (response.status === 200) {
                    return await response.json() as Task[]
                }
                return []
            })
    })
    return {
        isLoading,
        error,
        data
    }
}