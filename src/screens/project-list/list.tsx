import React, {useEffect, useState} from "react";
import {Button, Dropdown, Table, TableProps} from "antd";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import {Pin} from "../../component/pin";
import {useEditProject, useProjectModal} from "../../utils/projects";
import {User} from "../../auth-provider";

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
    const [projectRates, setProjectRates] = useState<Map<number, boolean>>();
    const {open} = useProjectModal()
    useEffect(() => {
        const rateMap = new Map<number, boolean>();
        listProps.dataSource?.forEach((project) => {
            rateMap.set(project.id, project.pin);
        })
        setProjectRates(rateMap);
    }, [listProps.dataSource])

    const mutate = useEditProject()

    return <Table {...listProps} columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render: (project) => {
                return <Pin checked={projectRates?.get(project.id)} onCheckedChange={async (pin) => {
                    await mutate.mutate({id: project.id, pin})
                    if (!mutate.isError) {
                        const newMap = new Map(projectRates)
                        newMap.set(project.id, pin)
                        setProjectRates(newMap)
                    }
                }}/>
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
        },
        {
            title: '操作',
            render: () => {
                return <Dropdown menu={{
                    items: [
                        {
                            key: "edit",
                            label: (<Button type={"link"} onClick={open}>编辑</Button>)

                        },
                        {
                            key: "delete",
                            label: (<Button type={"link"} onClick={open}>删除</Button>)
                        },
                    ]
                }}>
                    <Button type={"link"} onClick={(e) => e.preventDefault()}>...</Button>
                </Dropdown>
            }
        }
    ]}/>
}