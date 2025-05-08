import {useKanbans} from "../../utils/kanban";
import styled from "@emotion/styled";
import {useProjectFromUrl} from "../../utils/projects";
import {KanbanColumn} from "./kanban-column";

export const Kanban = () => {
    // find project by id in url && get project data
    // fetch kanban data
    // render kanban
    const project = useProjectFromUrl();
    const {data} = useKanbans({projectId: project?.id})

    return <>
        <h2>{project?.name}看板</h2>
        <KanbanContainer>
            {
                data?.map(kanban => <KanbanColumn kanban={kanban}/>)
            }
        </KanbanContainer>
    </>
}

const KanbanContainer = styled.div`
  display: flex;
  justify-content: space-around;
  //overflow: hidden;
`