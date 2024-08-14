import React from 'react';
import './App.css';
import {AuthContextProvider, useAuth} from "./context/auth-context";
import {UnauthenticatedApp} from "./unauthenticated-app";
import {AuthenticatedApp} from "./authenticated-app";

function App() {
    // console.log("start")
    // test().then(() => console.log("out print"))
    // console.log("end")
    return (
        <AuthContextProvider>
            <div className="App">
                <InnerApp/>
            </div>
        </AuthContextProvider>
    );
}

// const test = async () => {
//      test2().then(()=>{
//         console.log("async function1")
//     })
//     console.log("async function1 ....")
// }
//
// const test2 = async ()=>{
//     console.log("async function2")
// }

const InnerApp = () => {
    const {user} = useAuth()
    return user && user.token ? <AuthenticatedApp/> : <UnauthenticatedApp/>
}

export default App;
