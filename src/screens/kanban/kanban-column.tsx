import {Kanban} from "../../types/kanban";
import {useTasks} from "../../utils/task";
import styled from "@emotion/styled";
import {Card} from "antd";
import {useUrlQueryParams} from "../../utils/use-url";

export const KanbanColumn = (props: { kanban: Kanban }) => {
    const [urlParams] = useUrlQueryParams(['name', 'processorId']);
    const {data} = useTasks(
        {projectId: props.kanban.projectId, processorId: Number(urlParams.processorId), name: urlParams.name})
    return <ColumnContainer key={props.kanban.id}>
        <h2>{props.kanban.name}</h2>
        <TaskContainer>
            {
                data?.filter(task => task.kanbanId === props.kanban.id)
                    .map(task => <Card style={{marginTop: '1rem'}}>{task.name}</Card>)
            }
        </TaskContainer>
    </ColumnContainer>
}

const ColumnContainer
    = styled.div`
  min-width: 30rem;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: #eee;
  margin-right: 1rem;
`

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`