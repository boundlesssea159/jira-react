import {useKanbans} from "../../utils/kanban";
import styled from "@emotion/styled";
import {useProjectFromUrl} from "../../utils/projects";
import {KanbanColumn} from "./kanban-column";
import {SearchPanel} from "./search-panel";
import {CreateKanban} from "./create-kanban";
import {DeleteKanban} from "./delete-kanban";

export const Kanban = () => {
    // find project by id in url && get project data
    // fetch kanban data
    // render kanban
    const project = useProjectFromUrl();
    const {data} = useKanbans({projectId: project?.id})

    return <KanbanContainer>
        <h1>{project?.name}看板</h1>
        <SearchPanel/>
        <KanbanColumnsContainer>
            {
                data?.map(kanban => <KanbanColumn kanban={kanban}/>)
            }
            <CreateKanban/>
        </KanbanColumnsContainer>
    </KanbanContainer>
}

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`

const KanbanColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  min-height: 0;
  overflow: scroll;
`