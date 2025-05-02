import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "./index";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
    const [urlParams, setUrlParams] = useSearchParams();

    return [
        useMemo(() => {
            return keys.reduce((prev, key) => {
                return {
                    ...prev,
                    [key]: urlParams.get(key) || ''
                }
            }, {} as { [key in K]: string })
        }, [urlParams]),
        (params: Partial<Record<K, string>>) => {
            const newUrlParams = cleanObject({...Object.fromEntries(urlParams), ...params}) as URLSearchParamsInit
            return setUrlParams(newUrlParams)
        }
    ] as const
}


