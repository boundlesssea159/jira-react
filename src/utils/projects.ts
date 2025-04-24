import {useAsync} from "./use-async";
import {Project} from "../screens/project-list/list";

const serviceUrl = process.env.REACT_APP_API_URL
export const useEditProject = () => {
    const {run, error} = useAsync();
    const mutate = (params: Partial<Project>) => {
        console.log("params:" + JSON.stringify(params))
        return run(fetch(`${serviceUrl}/projects/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
        )
    }

    return {
        mutate,
        error
    }
}