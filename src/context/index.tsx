import React, {ReactNode} from "react";
import {AuthProvider} from "./auth-context";

// AppProviders的children属性会被自动赋予为其子组件，所以不用显示传递children给AppProviders
export const AppProviders = ({children}: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>
}