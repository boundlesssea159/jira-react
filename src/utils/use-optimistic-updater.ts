// define other queryKey
import {QueryKey, useQueryClient} from "react-query";

export const useOptimisticUpdater = (queryKey: QueryKey, action: (oldData?: any[], target?: any) => any) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => {
            // default is fuzzy matching: match all keys that start with queryKey
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