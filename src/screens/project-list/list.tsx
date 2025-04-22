import React from "react";
import {Rate, Spin, Table, TableProps} from "antd";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import {Pin} from "../../component/pin";
import {useEditProject} from "../../utils/projects";

export interface User {
    id: string,
    name: string,
    token: string,
}

export interface Project {
    "id": number,
    "name": string,
    "personId": string,
    "organization": string,
    "created": string,
    "pin": boolean
}

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const List = (listProps: ListProps) => {
    const {mutate} = useEditProject()
    return <Table {...listProps} columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render: (project) => {
                return <Pin checked={project.pin} onCheckedChange={(pin) => mutate({id: project.id, pin})}/>
            }
        },
        {
            title: '名称',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
            render: (project) => {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
        },
        {
            title: '负责人',
            dataIndex: 'personId',
            render: (personId: string) => {
                return <span>{listProps.users.find(user => user.id === personId)?.name || "未知"}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            render: (created: string) => {
                return <>
                    {
                        created ? dayjs(created).format('YYYY-MM-DD') : "无"
                    }
                </>
            }
        }
    ]}/>
}