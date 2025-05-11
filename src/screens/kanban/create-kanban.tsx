import {useAddKanban, useKanbansQueryKey} from "../../utils/kanban";
import {ColumnContainer} from "./kanban-column";
import {Input} from "antd";
import {useProjectIdFromUrl} from "../../utils/projects";

export const CreateKanban = () => {
    const projectId = useProjectIdFromUrl();
    const mutate = useAddKanban(useKanbansQueryKey())
    return <ColumnContainer>
        <Input placeholder={'新建看板名称'} onPressEnter={async (evt) => {
            await mutate.mutate({name: evt.currentTarget.value, projectId: projectId})
        }}/>
    </ColumnContainer>
}