import {SearchPanel} from "./search-panel";
import {List, Project} from "./list";
import {useEffect, useState} from "react";
import React from "react";
import qs from "qs"
import {cleanObject, useDebounce} from "../../utils";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";
import {useDocumentTitle} from "../../utils/use-documentTitle";
import {useUrlQueryParams} from "../../utils/use-url";
import {useProjects} from "../../utils/projects";

const serviceUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useUrlQueryParams(["name", "personId"])
    const debouncedParam = useDebounce(param, 2000)
    useDocumentTitle("列表页", false)
    const {getProjects, data, isLoading, error} = useProjects()
    useEffect(() => {
        getProjects(debouncedParam)
    }, [debouncedParam])

    useEffect(() => {
        fetch(`${serviceUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        {error !== null ? <div>{error.message}</div> : null}
        <List users={users} dataSource={data || undefined} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
  padding: 2rem;
`
