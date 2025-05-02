import {Drawer} from "antd";
import {useProjectModal} from "../../utils/projects";

export const ProjectModal = () => {
    const {projectCreate, close} = useProjectModal()
    return <Drawer onClose={close} open={projectCreate} width={'100%'}>
        <h1>Hello Drawer</h1>
    </Drawer>
}