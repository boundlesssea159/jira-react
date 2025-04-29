import {AuthForm, User} from "../context/auth-context";
import {createSlice, Dispatch} from "@reduxjs/toolkit";
import * as auth from 'auth-provider';
import {RootStateType} from "./index";

type State = {
    user: User | null
}

const defaultState: State = {
    user: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: defaultState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
    }
});

export default userSlice.reducer;
export const authUserSelector = (state: RootStateType) => state.userSlice.user;

export const {setUser} = userSlice.actions;
export const loginThunk = (authForm: AuthForm) => (dispatch: Dispatch) => auth.login(authForm).then(user => dispatch(setUser(user)))
export const registerThunk = (authForm: AuthForm) => (dispatch: Dispatch) => auth.register(authForm).then(user => {
    console.log('user:', user)
    return dispatch(setUser(user))
})
export const logoutThunk = () => (dispatch: Dispatch) => auth.logout().then(() => dispatch(setUser(null)))
