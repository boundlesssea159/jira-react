import {useQuery} from "react-query";
import {Task} from "../types/task";

const serviceUrl = process.env.REACT_APP_API_URL
export const useTasks = (params: { projectId: number }) => {
    const {data, isLoading, error} = useQuery<Task[], Error>(["tasks", params], () => {
        return fetch(`${serviceUrl}/tasks?projectId=${params.projectId}`)
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