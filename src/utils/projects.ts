import {useAsync} from "./use-async";
import {Project} from "../screens/project-list/list";
import qs from "qs";
import {cleanObject} from "./index";
import {useCallback} from "react";
import {useUrlQueryParams} from "./use-url";

const serviceUrl = process.env.REACT_APP_API_URL
export const useEditProject = () => {
    const {run, error} = useAsync();
    const mutate = useCallback((params: Partial<Project>) => {
        return run(fetch(`${serviceUrl}/projects/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
        )
    }, [run])
    return {
        mutate,
        error
    }
}


export const useProjects = () => {
    const {run, error, isLoading, data} = useAsync<Project[] | undefined>();
    const getProjects = useCallback((params: { name: string, personId: string }) => {
        return run(fetch(`${serviceUrl}/projects?${qs.stringify(cleanObject(params))}`)
            .then(async response => {
                if (response.status === 200) {
                    return await response.json() as Project[]
                }
            }))
    }, [run])
    return {
        getProjects,
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