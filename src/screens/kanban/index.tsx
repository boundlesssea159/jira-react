import {useKanbans} from "../../utils/kanban";
import styled from "@emotion/styled";
import {useProjectFromUrl} from "../../utils/projects";
import {KanbanColumn} from "./kanban-column";
import {SearchPanel} from "./search-panel";
import {CreateKanban} from "./create-kanban";

export const Kanban = () => {
    // find project by id in url && get project data
    // fetch kanban data
    // render kanban
    const project = useProjectFromUrl();
    const {data} = useKanbans({projectId: project?.id})

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>{project?.name}看板</h1>
        <SearchPanel/>
        <KanbanContainer>
            {
                data?.map(kanban => <KanbanColumn kanban={kanban}/>)
            }
            <CreateKanban/>
        </KanbanContainer>
    </div>
}

const KanbanContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
`