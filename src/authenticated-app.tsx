import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./component/lib";
import logo from "assets/logo.svg";
import {Button, Dropdown, Image} from "antd";
import {Navigate, Route, Routes} from "react-router";
import {ProjectScreen} from "./screens/project";

export const AuthenticatedApp = () => {
    return <div>
        <PageHeader/>
        <Routes>
            <Route index element={<Navigate to="/projects"/>}/>
            <Route path={"projects"} element={<ProjectListScreen/>}/>
            <Route path={"projects/:projectId/*"} element={<ProjectScreen/>}/>
        </Routes>
    </div>
}

const PageHeader = () => {
    const {logout, user} = useAuth();
    return (
        <Header setSpaceBetween={true}>
            <HeaderLeft marginRight={true}>
                <Button type={"link"} onClick={() => window.location.pathname = '/'}>
                    <Image src={logo} width={"3rem"} height={"3rem"}/>
                </Button>
                <h2>项目</h2>
                <h2>成员</h2>
            </HeaderLeft>
            <Dropdown menu={{
                items: [{
                    key: "1",
                    label: (<Button type={"link"} color={"blue"} onClick={logout}>登出</Button>)
                }]
            }}>
                <Button type={"link"} onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
            </Dropdown>
        </Header>
    )
}

const Header = styled(Row)`
  padding: 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``