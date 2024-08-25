import {useState} from "react";

export const useAsync = <D>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<D>()
    const run = (promise: Promise<D>) => {
        setIsLoading(true);
        promise.then((data) => {
            setData(data)
            return data
        })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }

    return {run, isLoading, error, data}
}