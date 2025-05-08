import {useQuery} from "react-query";
import {Kanban} from "../types/kanban";

const serviceUrl = process.env.REACT_APP_API_URL
export const useKanbans = (params: { projectId?: number }) => {
    const {data, isLoading, error} = useQuery<Kanban[], Error>(["kanbans", params], () => {
        return fetch(`${serviceUrl}/kanbans?projectId=${params?.projectId}`)
            .then(async response => {
                if (response.status === 200) {
                    return await response.json() as Kanban[]
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