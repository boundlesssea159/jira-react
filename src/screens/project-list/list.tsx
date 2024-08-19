import React from "react";
import {Table} from "antd";


export interface User {
    id: string,
    name: string,
    token: string,
}

interface Project {
    "id": number,
    "name": string,
    "personId": string,
    "organization": string,
    "created": string
}

export const List = ({list, users}: { list: Project[], users: User[] }) => {
    return <Table dataSource={list} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    }, {
        title: '负责人',
        dataIndex: 'personId',
        render: (personId: string) => {
            return <span>{users.find(user => user.id === personId)?.name || "未知"}</span>
        }
    }]}/>
}