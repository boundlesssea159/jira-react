import {Button, Drawer} from "antd";

export const ProjectModal = (props: { open: boolean, close: () => void }) => {
    return <Drawer onClose={props.close} open={props.open} width={'100%'}>
        <h1>Hello Drawer</h1>
    </Drawer>
}