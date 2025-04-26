import {configureStore} from "@reduxjs/toolkit";
import createProjectReducer from "../screens/project-list/project-list.slice";


export const store = configureStore({
    reducer: {
        createProject: createProjectReducer,
    },
})

export type RootStateType = ReturnType<typeof store.getState>

