import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./component/lib";
import logo from "assets/logo.svg";
import {Dropdown, Image} from "antd";

export const AuthenticatedApp = () => {
    const {logout, user} = useAuth();
    return <div>
        <PageHeader setSpaceBetween={true}>
            <HeaderLeft marginRight={true}>
                <Image src={logo} width={"3rem"} height={"3rem"}/>
                <h2>项目</h2>
                <h2>成员</h2>
            </HeaderLeft>
            <Dropdown menu={{items: [{key: "1", label: (<a color={"blue"} onClick={logout}>登出</a>)}]}}>
                <a href={""} onClick={e => e.preventDefault()}>Hi, {user?.name}</a>
            </Dropdown>
        </PageHeader>
        <ProjectListScreen/>
    </div>
}

const PageHeader = styled(Row)`
  padding: 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``