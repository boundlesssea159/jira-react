import {useState} from "react";
import {Card, Input} from "antd";
import {useAddTask} from "../../utils/task";
import {useProjectIdFromUrl} from "../../utils/projects";

export const CreateTask = (props: { kanbanId: number }) => {
    const [isInputModel, setIsInputModel] = useState(false)
    const projectId = useProjectIdFromUrl()

    const mutate = useAddTask(['tasks'])

    if (!isInputModel) {
        return <>
            <br/>
            <div onClick={() => setIsInputModel(true)}>+创建任务</div>
            <br/>
        </>
    }

    return <Card>
        <Input
            size={'large'}
            placeholder="请输入任务名"
            onPressEnter={async (evt) => {
                await mutate.mutate({name: evt.currentTarget.value, kanbanId: props.kanbanId, projectId: projectId})
                setIsInputModel(false)
            }}/>
    </Card>
}