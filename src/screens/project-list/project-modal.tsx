import {Drawer} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {closeCreateProjectModal, createProjectStateSelector} from "./project-list.slice";

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const openCreateProjectModal = useSelector(createProjectStateSelector)
    return <Drawer onClose={() => dispatch(closeCreateProjectModal())} open={openCreateProjectModal} width={'100%'}>
        <h1>Hello Drawer</h1>
    </Drawer>
}