import {QueryKey, useMutation, useQuery} from "react-query";
import {Task} from "../types/task";
import qs from "qs";
import {cleanObject} from "./index";
import {useOptimisticUpdater} from "./use-optimistic-updater";
import {useProjectIdFromUrl} from "./projects";

const serviceUrl = process.env.REACT_APP_API_URL
export const useTaskQueryKey = (kanbanId: number) => {
    const projectId = useProjectIdFromUrl()
    return [
        'tasks',
        {projectId: projectId, kanbanId: kanbanId}
    ]
}
export const useTasks = (params: { projectId: number, processorId?: number, name?: string }) => {
    const {data, isLoading, error} = useQuery<Task[], Error>(["tasks", cleanObject(params)], () => {
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

export const useAddTask = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? [...oldData, target] : [target]
    })
    return useMutation({
        mutationFn: (params: Partial<Task>) => fetch(`${serviceUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        ...optimisticUpdater
    })
}


export const useTask = (id: number) => {
    const {data, isLoading, error} = useQuery<Task, Error>(
        ["tasks", id],
        () => {
            return fetch(`${serviceUrl}/tasks/${id}`)
                .then(async response => {
                    if (response.status === 200) {
                        return await response.json() as Task
                    }
                    return {} as Task
                })
        },
        {
            initialData: undefined,
            enabled: Boolean(id)
        }
    )
    return {
        isLoading,
        error,
        data
    }
}

export const useEditTask = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? oldData.map(project => project.id === target.id ? {...project, ...target} : project) : []
    })
    return useMutation({
        mutationFn: (params: Partial<Task>) => fetch(`${serviceUrl}/tasks/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        ...optimisticUpdater,
    })
}