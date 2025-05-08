import {Kanban} from "../../types/kanban";
import {useTasks} from "../../utils/task";
import styled from "@emotion/styled";

export const KanbanColumn = (props: { kanban: Kanban }) => {
    const {data} = useTasks({projectId: props.kanban.projectId})
    return <div key={props.kanban.id}>
        <h4>{props.kanban.name}</h4>
        <ColumnContainer>
            {
                data?.filter(task => task.kanbanId === props.kanban.id)
                    .map(task => <div key={task.id}>{task.name}</div>)
            }
        </ColumnContainer>
    </div>
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`