import {QueryKey, useMutation, useQuery} from "react-query";
import {Kanban} from "../types/kanban";

import {useOptimisticUpdater} from "./use-optimistic-updater";
import {useProjectIdFromUrl} from "./projects";
import qs from "qs";
import {cleanObject} from "./index";

const serviceUrl = process.env.REACT_APP_API_URL


export const useKanbansQueryKey = () => {
    const id = useProjectIdFromUrl();
    return [
        "kanbans",
        {projectId: id}
    ] as const
}

export const useKanbans = (params: { projectId?: number }) => {
    const {data, isLoading, error} = useQuery<Kanban[], Error>(["kanbans", params], () => {
        return fetch(`${serviceUrl}/kanbans?${qs.stringify(cleanObject(params))}`)
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

export const useAddKanban = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? [...oldData, target] : [target]
    })
    return useMutation({
        mutationFn: (params: Partial<Kanban>) => fetch(`${serviceUrl}/kanbans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        ...optimisticUpdater
    })
}

export const useDeleteKanban = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? oldData.filter(kanban => kanban.id !== target.id) : []
    })
    return useMutation({
        mutationFn: (target: { id: number }) => fetch(`${serviceUrl}/kanbans/${target.id}`, {
            method: 'DELETE',
        }),
        ...optimisticUpdater
    })
}