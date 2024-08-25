import {SearchPanel} from "./search-panel";
import {List, Project} from "./list";
import {useEffect, useState} from "react";
import React from "react";
import qs from "qs"
import {cleanObject, useDebounce} from "../../utils";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";

const serviceUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)

    const {run, error, isLoading, data} = useAsync<Project[]>()

    useEffect(() => {
        run(fetch(`${serviceUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
            .then(async response => {
                if (response.ok) {
                    return await response.json()
                }
            }))
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
        {error ? <div>{error}</div> : null}
        <List users={users} dataSource={data} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
  padding: 2rem;
`
