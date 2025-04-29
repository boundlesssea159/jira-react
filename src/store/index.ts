import {configureStore} from "@reduxjs/toolkit";
import createProjectReducer from "../screens/project-list/project-list.slice";
import authSliceReducer from "../store/auth.slice";


export const store = configureStore({
    reducer: {
        createProject: createProjectReducer,
        userSlice: authSliceReducer
    },
})

export type RootStateType = ReturnType<typeof store.getState>

