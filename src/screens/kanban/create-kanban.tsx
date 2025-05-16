import {useAddKanban, useKanbansQueryKey} from "../../utils/kanban";
import {ColumnContainer} from "./kanban-column";
import {Input} from "antd";
import {useProjectIdFromUrl} from "../../utils/projects";
import {useState} from "react";

export const CreateKanban = () => {
    const [value, setValue] = useState("");
    const projectId = useProjectIdFromUrl();
    const mutate = useAddKanban(useKanbansQueryKey())
    return <ColumnContainer>
        <Input placeholder={'新建看板名称'}
               value={value}
               onChange={e => setValue(e.target.value)}
               onPressEnter={async (evt) => {
                   await mutate.mutate({name: evt.currentTarget.value, projectId: projectId})
                   setValue("")
               }}/>
    </ColumnContainer>
}