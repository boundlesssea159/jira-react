import {Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
import {useEditTask} from "../../utils/task";
import {Task} from "../../types/task";
import {useEffect} from "react";

export const EditTask = (props: { task?: Task, onCancel: () => void }) => {
    const [form] = useForm();
    const editTask = useEditTask(['tasks']);

    useEffect(() => {
        form.setFieldsValue(props.task)
    }, [props.task, form])

    const onCancel = () => {
        form.resetFields()
        props.onCancel()
    }

    const onFinish = async (values: any) => {
        const fieldsValue = form.getFieldsValue();
        await editTask.mutate({...props.task, ...fieldsValue})
        onCancel()
    }

    return <Modal onCancel={onCancel} onOk={onFinish} open={Boolean(props.task?.id)}>
        <Form form={form}>
            <Form.Item label={'任务名'} name={'name'}>
                <Input/>
            </Form.Item>
            <Form.Item label={'负责人'} name={'processorId'}>
                <Input/>
            </Form.Item>
            <Form.Item label={'任务类型'} name={'typeId'}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
}