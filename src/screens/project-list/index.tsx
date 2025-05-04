import {SearchPanel} from "./search-panel";
import {List} from "./list";
import React from "react";
import {useDebounce} from "../../utils";
import styled from "@emotion/styled";
import {useDocumentTitle} from "../../utils/use-documentTitle";
import {useUrlQueryParams} from "../../utils/use-url";
import {useProjectModal, useProjects} from "../../utils/projects";
import {Button, Row} from "antd";
import {useUsers} from "../../utils/users";

export const ProjectListScreen = () => {
    const {data: users} = useUsers()
    const [param, setParam] = useUrlQueryParams(["name", "personId"])
    const debouncedParam = useDebounce(param, 1000)
    useDocumentTitle("列表页", false)
    const {openCreateProject} = useProjectModal()
    const {data, isLoading, error} = useProjects(debouncedParam)
    return <Container>
        <Row align={"middle"} justify={"space-between"}>
            <h1 style={{marginTop: "0"}}>项目列表</h1>
            <Button onClick={openCreateProject}>创建项目</Button>
        </Row>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        {error !== null ? <div>{error?.message}</div> : null}
        <List users={users} dataSource={data || undefined} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
  padding: 2rem;
`
// todo pagination query