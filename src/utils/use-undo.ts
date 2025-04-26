import {useCallback, useState} from "react";

export const useUndo = <T>(initialValue: T) => {
    const [state, setState] = useState<{
        current: T,
        history: T[],
        future: T[],
    }>({
        current: initialValue,
        history: [],
        future: [],
    })

    const set = useCallback((value: T) => {
        const {current, history} = state
        const newCurrent = value
        const newHistory: T[] = [...history, current]
        setState({...state, current: newCurrent, history: newHistory})
    }, [])

    const undo = useCallback(() => {
        const {current, history, future} = state
        const newCurrent = history[history.length - 1]
        const newHistory = history.slice(0, history.length - 1)
        const newFuture: T[] = [current, ...future]
        setState({...state, current: newCurrent, history: newHistory, future: newFuture})
    }, [])


    const redo = useCallback(() => {
        const {current, history, future} = state
        const newCurrent = future[0]
        const newHistory: T[] = [...history, current]
        const newFuture: T[] = future.slice(1)
        setState({...state, current: newCurrent, history: newHistory, future: newFuture})
    }, [])

    const reset = useCallback(() => {
        setState({
            current: initialValue,
            history: [],
            future: [],
        })
    }, [])

    return [
        state,
        set,
        undo,
        redo,
        reset,
    ]
}

const SET = 'set'
const UNDO = 'undo'
const REDO = 'redo'
const RESET = 'reset'

function reducer<T>(state: { current: T, history: T[], future: T[] },
                    action: { type: typeof SET, value: T } | { type: typeof UNDO } | { type: typeof REDO } | {
                        type: typeof RESET
                    }) {
    switch (action.type) {
        case SET:
            return {
                ...state,
                current: action.value,
                history: [...state.history, state.current],
                future: [],
            }
        case UNDO:
            return {
                ...state,
                current: state.history[state.history.length - 1],
                history: state.history.slice(0, state.history.length - 1),
                future: [state.current, ...state.future]
            }
        case REDO:
            return {
                ...state,
                current: state.future[0],
                history: [...state.history, state.current],
                future: state.future.slice(1)
            }
        case RESET:
            return {
                current: state.current,
                history: [],
                future: [],
            }
        default:
            return state
    }
}