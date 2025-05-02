import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import React from "react";
import {useDebounce} from "../../utils";
import styled from "@emotion/styled";
import {useDocumentTitle} from "../../utils/use-documentTitle";
import {useUrlQueryParams} from "../../utils/use-url";
import {useProjectModal, useProjects} from "../../utils/projects";
import {Button, Row} from "antd";

const serviceUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useUrlQueryParams(["name", "personId"])
    const debouncedParam = useDebounce(param, 1000)
    useDocumentTitle("列表页", false)
    const {open} = useProjectModal()
    const {data, isLoading, error} = useProjects(debouncedParam)
    useEffect(() => {
        fetch(`${serviceUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return <Container>
        <Row align={"middle"} justify={"space-between"}>
            <h1 style={{marginTop: "0"}}>项目列表</h1>
            <Button onClick={open}>创建项目</Button>
        </Row>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        {error !== null ? <div>{error?.message}</div> : null}
        <List users={users} dataSource={data || undefined} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
  padding: 2rem;
`
