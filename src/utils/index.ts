import {useEffect, useState} from "react";

export const isFalsy = (value: any) => value === 0 ? false : !value
const isVoid = (value: any) => value === 0 || value === "" || value === undefined || value === null;
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = object[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}


export const useDebounce = <V>(value: V, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}
