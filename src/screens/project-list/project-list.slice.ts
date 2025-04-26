import {createSlice} from "@reduxjs/toolkit";
import {RootStateType} from "../../store";

type State = {
    openCreateProjectModal: boolean
}

const defaultState: State = {
    openCreateProjectModal: false
}

export const projectListSlice = createSlice({
    name: 'createProject',
    initialState: defaultState,
    reducers: {
        openCreateProjectModal: (state) => {
            state.openCreateProjectModal = true
        },
        closeCreateProjectModal: (state) => {
            state.openCreateProjectModal = false
        }
    }
})


export const {openCreateProjectModal, closeCreateProjectModal} = projectListSlice.actions

export default projectListSlice.reducer

export const createProjectStateSelector = (state: RootStateType) => state.createProject.openCreateProjectModal
