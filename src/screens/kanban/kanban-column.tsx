import {Kanban} from "../../types/kanban";
import {useTasks} from "../../utils/task";
import styled from "@emotion/styled";
import {Card} from "antd";
import {useUrlQueryParams} from "../../utils/use-url";
import {CreateTask} from "./create-task";
import {EditTask} from "./edit-task";
import {useState} from "react";
import {Task} from "../../types/task";

export const KanbanColumn = (props: { kanban: Kanban }) => {
    const [urlParams] = useUrlQueryParams(['name', 'processorId']);
    const {data} = useTasks(
        {projectId: props.kanban.projectId, processorId: Number(urlParams.processorId), name: urlParams.name})
    const [task, setTask] = useState<Task | undefined>()
    return <ColumnContainer key={props.kanban.id}>
        <h2>{props.kanban.name}</h2>
        <TaskContainer>
            {
                data?.filter(task => task.kanbanId === props.kanban.id)
                    .map(task => <Card onClick={() => setTask(task)} style={{marginTop: '1rem'}}>{task.name}</Card>)
            }
            <CreateTask kanbanId={props.kanban.id}/>
        </TaskContainer>
        <EditTask task={task} onCancel={() => setTask(undefined)}/>
    </ColumnContainer>
}

export const ColumnContainer = styled.div`
  min-width: 30rem;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: #eee;
  margin-right: 1rem;
  height: 70vh;
  overflow: scroll;
`

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`