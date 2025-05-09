import {useQuery} from "react-query";
import {Task} from "../types/task";
import qs from "qs";
import {cleanObject} from "./index";

const serviceUrl = process.env.REACT_APP_API_URL
export const useTasks = (params: { projectId: number, processorId?: number, name?: string }) => {
    const {data, isLoading, error} = useQuery<Task[], Error>(["tasks", params], () => {
        return fetch(`${serviceUrl}/tasks?${qs.stringify(cleanObject(params))}`)
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