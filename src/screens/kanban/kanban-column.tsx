import {Kanban} from "../../types/kanban";
import {useDeleteTask, useTasks} from "../../utils/task";
import styled from "@emotion/styled";
import {Button, Card} from "antd";
import {useUrlQueryParams} from "../../utils/use-url";
import {CreateTask} from "./create-task";
import {EditTask} from "./edit-task";
import {useState} from "react";
import {Task} from "../../types/task";
import {DeleteKanban} from "./delete-kanban";

export const KanbanColumn = (props: { kanban: Kanban }) => {
    const [urlParams] = useUrlQueryParams(['name', 'processorId']);
    const {data} = useTasks(
        {projectId: props.kanban.projectId, processorId: Number(urlParams.processorId), name: urlParams.name})
    const [task, setTask] = useState<Task | undefined>()
    const deleteTask = useDeleteTask(['tasks'])
    return <ColumnContainer key={props.kanban.id}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h2>{props.kanban.name}</h2>
            <DeleteKanban kanbanId={props.kanban.id}/>
        </div>
        <TaskContainer>
            {
                data?.filter(task => task.kanbanId === props.kanban.id)
                    .map(task =>
                        <Card onClick={() => setTask(task)} style={{marginTop: '1rem'}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {task.name}
                                <Button
                                    size={"small"}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        deleteTask.mutate({id: task.id})
                                    }}
                                >删除</Button>
                            </div>
                        </Card>)
            }
            <CreateTask kanbanId={props.kanban.id}/>
        </TaskContainer>
        <EditTask task={task} onCancel={() => setTask(undefined)}/>
    </ColumnContainer>
}

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: #eee;
  margin-right: 1rem;
  flex: 1;
  min-height: 0;
`

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`