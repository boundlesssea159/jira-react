import React from 'react';
import './App.css';
import {ProjectListScreen} from "./screens/project-list";
import {LoginScreen} from "./screens/login";
import {AuthProvider} from "./context/auth-context";
import {AppProviders} from "./context";

function App() {
    return (
        <div className="App">
            <AppProviders>
                <LoginScreen/>
            </AppProviders>
        </div>
    );
}

export default App;
