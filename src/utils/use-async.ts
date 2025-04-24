import {useCallback, useState} from "react";

export const useAsync = <D>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<D | null>(null)
    const run = useCallback((promise: Promise<D>) => {
        setIsLoading(true);
        promise
            .then((data) => {
                setData(data)
                return data
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => setIsLoading(false))
    }, [])
    return {run, isLoading, error, data, setData}
}