// define other queryKey
import {QueryKey, useQueryClient} from "react-query";

export const useOptimisticUpdater = (queryKey: QueryKey, action: (oldData?: any[], target?: any) => any) => {
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