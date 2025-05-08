import {useQuery} from "react-query";
import {Kanban} from "../types/kanban";

const serviceUrl = process.env.REACT_APP_API_URL
export const useKanbans = () => {
    const {data, isLoading, error} = useQuery<Kanban[], Error>(["kanbans"], () => {
        return fetch(`${serviceUrl}/kanbans?}`)
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