import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./component/lib";

export const AuthenticatedApp = () => {
    const {logout} = useAuth();
    return <div>
        <PageHeader setSpaceBetween={true}>
            <HeaderLeft marginRight={true}>
                <h3>logo</h3>
                <h3>项目</h3>
                <h3>成员</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={() => logout()}>登出</button>
            </HeaderRight>
        </PageHeader>
        <MainContainer>
            <LeftSide></LeftSide>
            <Main>
                <ProjectListScreen/>
            </Main>
            <RightSide></RightSide>
        </MainContainer>
        <Footer></Footer>
    </div>
}

const PageHeader = styled(Row)``
const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftSide = styled.div`
  flex-grow: 2;`

const Main = styled.div`
  flex-grow: 6;
`

const RightSide = styled.div`
  flex-grow: 2;
`

const Footer = styled.div`
  height: 10vh;

`