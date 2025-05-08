import qs from "qs";
import {cleanObject} from "./index";
import {useUrlQueryParams} from "./use-url";
import {QueryKey, useMutation, useQuery, useQueryClient} from "react-query";
import {Project} from "../types/project";

const serviceUrl = process.env.REACT_APP_API_URL
export const useProjectsSearchParamsQueryKey = () => {
    const [params] = useUrlQueryParams(['name', 'personId'])
    return [
        "projects",
        params
    ] as const
}
// define other queryKey
const useOptimisticUpdater = (queryKey: QueryKey, action: (oldData?: any[], target?: any) => any) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => {
            // if not set exact:true manually, all caches that key contains "projects" will be updated
            // such as keys: ["projects",{name:"",personId:""}],["projects",{name:"",personId:1}],["projects",{name:"物料管理",personId:""}], all relative caches will be updated
            queryClient.invalidateQueries(queryKey)
        },
        // pre handle the cached data before query
        onMutate: (target: any) => {
            // find the project in the cache
            const preData = queryClient.getQueryData(queryKey);
            // update the cached project
            queryClient.setQueryData(queryKey, (oldData?: any) => {
                // return oldData ? oldData.map(project => project.id === target.id ? {...project, ...target} : project) : []
                return action(oldData, target)
            })
            // return for onError
            return preData
        },
        onError: (error: any, variables: any, context: any) => {
            queryClient.setQueryData(queryKey, context.preData)
        },
    }
}

export const useEditProject = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? oldData.map(project => project.id === target.id ? {...project, ...target} : project) : []
    })
    return useMutation({
        mutationFn: (params: Partial<Project>) => fetch(`${serviceUrl}/projects/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        ...optimisticUpdater,
    })
}


export const useAddProject = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? [...oldData, target] : [target]
    })
    return useMutation({
        mutationFn: (params: Partial<Project>) => fetch(`${serviceUrl}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        ...optimisticUpdater
    })
}


export const useProjects = (params: { name: string, personId: string }) => {
    const {data, isLoading, error} = useQuery<Project[], Error>(["projects", params], () => {
        return fetch(`${serviceUrl}/projects?${qs.stringify(cleanObject(params))}`)
            .then(async response => {
                if (response.status === 200) {
                    return await response.json() as Project[]
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

export const useProject = (id: number) => {
    const {data, isLoading, error} = useQuery<Project, Error>(
        ["project", id],
        () => {
            return fetch(`${serviceUrl}/projects/${id}`)
                .then(async response => {
                    if (response.status === 200) {
                        return await response.json() as Project
                    }
                    return {} as Project
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

export const useDeleteProject = (queryKey: QueryKey) => {
    const optimisticUpdater = useOptimisticUpdater(queryKey, (oldData?: any[], target?: any) => {
        return oldData ? oldData.filter(project => project.id !== target.id) : []
    })
    return useMutation({
        mutationFn: (target: { id: number }) => fetch(`${serviceUrl}/projects/${target.id}`, {
            method: 'DELETE',
        }),
        ...optimisticUpdater
    })
}

export const useProjectModal = () => {
    const [{createProject}, setCreateProject] = useUrlQueryParams(['createProject'])

    const [{editProjectId}, setEditProjectId] = useUrlQueryParams(['editProjectId'])

    const {data: project} = useProject(Number(editProjectId));
    const openCreateProject = () => setCreateProject({createProject: "true"})
    const openEditProject = (id: number) => setEditProjectId({editProjectId: String(id)})
    const close = () => {
        setCreateProject({createProject: undefined})
        setEditProjectId({editProjectId: undefined})
    }

    return {
        openModal: createProject === 'true' || Boolean(editProjectId),
        openCreateProject,
        close,
        project,
        openEditProject,
    }
}