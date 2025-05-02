import {Project} from "../screens/project-list/list";
import qs from "qs";
import {cleanObject} from "./index";
import {useUrlQueryParams} from "./use-url";
import {useMutation, useQuery, useQueryClient} from "react-query";

const serviceUrl = process.env.REACT_APP_API_URL
export const useEditProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: Partial<Project>) => fetch(`${serviceUrl}/projects/${params.id}`, {
            method: 'PATCH',
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

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParams(['projectCreate'])
    const open = () => setProjectCreate({projectCreate: "true"})
    const close = () => setProjectCreate({projectCreate: undefined})

    return {
        projectCreate: projectCreate === 'true',
        open,
        close,
    }

}