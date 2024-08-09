import {useEffect, useState} from "react";

export const isFalsy = (value:any) => value === 0 ? false : !value

export const cleanObject = (object:object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = object[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}


export interface Param {
    name: string,
    personId: string
}

interface UseDebounceParam {
    value: Param,
    delay: number
}

export const useDebounce = ({value, delay}: UseDebounceParam) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout
        (() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}
