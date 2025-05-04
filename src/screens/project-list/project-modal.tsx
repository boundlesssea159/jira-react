import {Button, Drawer, Form, Input} from "antd";
import {useAddProject, useEditProject, useProjectModal} from "../../utils/projects";
import styled from "@emotion/styled";
import {useForm} from "antd/es/form/Form";
import {UserSelect} from "../../component/user-select";
import {useEffect} from "react";

export const ProjectModal = () => {
    const {openModal, close, project} = useProjectModal()
    const add = useAddProject()
    const edit = useEditProject()

    const [form] = useForm()
    const onFinish = (values: any) => {
        if (project?.id) {
            edit.mutateAsync({
                id: project.id,
                name: values['name'],
                personId: values['personId'],
                organization: values['organization'],
            }).then(() => {
                form.resetFields()
                close()
            })
        } else {
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
    }

    useEffect(() => {
        if (project?.id) {
            form.setFieldsValue(project)
        }
    }, [project, form])

    return <Drawer onClose={close} open={openModal} width={'100%'}>
        <CreateProjectForm>
            <h1>{Boolean(project?.id) ? '编辑项目' : '创建项目'}</h1>
            <Form onFinish={onFinish} form={form}>
                <Form.Item label={'名称'} key={'name'} name={'name'}
                           rules={[{required: true, message: '请输入项目名'}]}>
                    <Input placeholder={'名称'}/>
                </Form.Item>
                <Form.Item label={'部门'} key={'organization'} name={'organization'}
                           rules={[{required: true, message: '请输入部门'}]}>
                    <Input placeholder={'部门'}/>
                </Form.Item>
                <Form.Item label={'负责人'} key={'personId'} name={'personId'}
                           rules={[{required: true, message: '请选择负责人'}]}>
                    <UserSelect/>
                </Form.Item>
                <Form.Item style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </CreateProjectForm>
    </Drawer>
}

const CreateProjectForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`