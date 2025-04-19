import React from 'react';
import './App.css';
import {AuthContextProvider, useAuth} from "./context/auth-context";
import {UnauthenticatedApp} from "./unauthenticated-app";
import {AuthenticatedApp} from "./authenticated-app";
import {ErrorBoundary} from "react-error-boundary";

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
    return <>
        <ErrorBoundary fallbackRender={fallbackRender} onReset={(details) => {
            // Reset the state of your app so the error doesn't happen again
        }}>
            {user && user.token ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
        </ErrorBoundary>
    </>
}

// show the default page when error occurs while rendering
function fallbackRender({error, resetErrorBoundary}: any) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{color: "red"}}>{error.message}</pre>
        </div>
    );
}

export default App;

// todo useDocumentTitle,展示对应页面的title