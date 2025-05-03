import {Button, Drawer, Form, Input, Select} from "antd";
import {useAddProject, useProjectModal} from "../../utils/projects";
import {useUsers} from "../../utils/users";
import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {useForm} from "antd/es/form/Form";

export const ProjectModal = () => {
    const {projectCreate, close} = useProjectModal()
    const {data: users} = useUsers()
    const [labels, setLabels] = useState<{ value: string, label: string }[]>([])
    useEffect(() => {
        const labels = users.map(user => {
            return {value: user.id, label: user.name}
        })
        setLabels(labels)
    }, [users])

    const add = useAddProject()
    const [form] = useForm()
    const onFinish = (values: any) => {
        add.mutateAsync({
            name: values['name'],
            personId: values['personId'],
            organization: values['organization'],
            created: new Date().toLocaleDateString()
        }).then(() => {
            form.resetFields()
            close()
        })
    }

    return <CreateProjectDrawer onClose={close} open={projectCreate} width={'100%'}>
        <h1>创建项目</h1>
        <Form onFinish={onFinish} form={form}>
            <Form.Item label={'名称'} key={'name'} name={'name'} rules={[{required: true, message: '请输入项目名'}]}>
                <Input placeholder={'名称'}/>
            </Form.Item>
            <Form.Item label={'部门'} key={'organization'} name={'organization'}
                       rules={[{required: true, message: '请输入部门'}]}>
                <Input placeholder={'部门'}/>
            </Form.Item>
            <Form.Item label={'负责人'} key={'personId'} name={'personId'}
                       rules={[{required: true, message: '请选择负责人'}]}>
                <Select
                    defaultValue="负责人"
                    style={{width: 120}}
                    popupMatchSelectWidth={false}
                    options={labels}
                />
            </Form.Item>
            <Form.Item style={{textAlign: 'right'}}>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    </CreateProjectDrawer>
}

const CreateProjectDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// todo add edit project button
//  1. fetch the project detail (hook)
//  2. edit the project detail (Boolean(id))

// todo encapsulate the <Select> for user list
