import React from 'react';
import './App.css';
import {AuthContextProvider, useAuth} from "./context/auth-context";
import {UnauthenticatedApp} from "./unauthenticated-app";
import {AuthenticatedApp} from "./authenticated-app";

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <InnerApp/>
            </div>
        </AuthContextProvider>
    );
}

const InnerApp = () => {
    const {user} = useAuth()
    return user && user.token ? <AuthenticatedApp/> : <UnauthenticatedApp/>
}

export default App;