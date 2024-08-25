import React, {useState} from "react";
export const useAsync = <D>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<D>()
    const run = (fetch: Promise<D>) => {
        setIsLoading(true);
        fetch.then((data) => {
            setData(data)
            return data
        })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }

    return {run, isLoading, error, data}
}