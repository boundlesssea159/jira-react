import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import React from "react";
import qs from "qs"
import {cleanObject, useDebounce} from "../../utils";
import styled from "@emotion/styled";

const serviceUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])

    const debouncedParam = useDebounce(param, 2000)


    useEffect(() => {
        fetch(`${serviceUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })

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
        <List users={users} list={list}/>
    </Container>
}

const Container = styled.div`
  padding: 2rem;
`
