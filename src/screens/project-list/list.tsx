import React from "react";
import {Button, Dropdown, Table, TableProps} from "antd";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import {Pin} from "../../component/pin";
import {useDeleteProject, useEditProject, useProjectModal, useProjectsSearchParamsQueryKey} from "../../utils/projects";
import {User} from "../../auth-provider";
import {Project} from "../../types/project";

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const List = (listProps: ListProps) => {
    const {openEditProject} = useProjectModal()
    const editProject = useEditProject(useProjectsSearchParamsQueryKey())
    const deleteProject = useDeleteProject(useProjectsSearchParamsQueryKey())
    return <Table {...listProps} columns={[
        {
            title: <Pin key={'title'} checked={true} disabled={true}/>,
            key: 'pin',
            render: (project) => {
                return <Pin key={'item'}
                            checked={project.pin}
                            onCheckedChange={async (pin) => await editProject.mutate({id: project.id, pin})}/>
            }
        },
        {
            title: '名称',
            key: 'name',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
            render: (project) => {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
            key: 'organization',
        },
        {
            title: '负责人',
            dataIndex: 'personId',
            key: 'personId',
            render: (personId: string) => {
                return <span key={personId}>{listProps.users.find(user => user.id === personId)?.name || "未知"}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
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
            key: '操作',
            render: (project) => {
                return <Dropdown menu={{
                    items: [
                        {
                            key: "edit",
                            label: (<Button key={'openEditProject'} type={"link"}
                                            onClick={() => openEditProject(project.id)}>编辑</Button>)

                        },
                        {
                            key: "delete",
                            label: (
                                <Button key={'deleteProject'} type={"link"}
                                        onClick={() => deleteProject.mutate({id: project.id})}>删除</Button>)
                        },
                    ]
                }}>
                    <Button key={'default'} type={"link"} onClick={(e) => e.preventDefault()}>...</Button>
                </Dropdown>
            }
        }
    ]}/>
}