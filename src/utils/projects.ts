import {Project} from "../screens/project-list/list";
import qs from "qs";
import {cleanObject} from "./index";
import {useUrlQueryParams} from "./use-url";
import {useMutation, useQuery, useQueryClient} from "react-query";

const serviceUrl = process.env.REACT_APP_API_URL
export const useEditProject = () => {
    const queryClient = useQueryClient()
    const [params] = useUrlQueryParams(['name', 'personId'])
    return useMutation({
        mutationFn: (params: Partial<Project>) => fetch(`${serviceUrl}/projects/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        onSuccess: () =>{
            // if not set exact:true manually, all caches that key contains "projects" will be updated
            // such as keys: ["projects",{name:"",personId:""}],["projects",{name:"",personId:1}],["projects",{name:"物料管理",personId:""}], all relative caches will be updated
            queryClient.invalidateQueries({queryKey: 'projects'})
        },
        // pre handle the cached data before query
        onMutate: (target) => {
            // find the project in the cache
            const queryKey = ["projects", params];
            const preData = queryClient.getQueryData(queryKey);
            // update the cached project
            queryClient.setQueryData(queryKey, (oldData?: Project[]) => {
                return oldData ? oldData.map(project => project.id === target.id ? {...project, ...target} : project) : []
            })
            // return for onError
            return preData
        },
        onError: (error, variables, context: any) => {
            queryClient.setQueryData(["projects", params], context.preData)
        },
    })
}


export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: Partial<Project>) => fetch(`${serviceUrl}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
        }
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

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => fetch(`${serviceUrl}/projects/${id}`, {
            method: 'DELETE',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries('projects')
        }
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