import {Button, List, Popover, Typography} from "antd";
import {useProjectModal, useProjects} from "../utils/projects";

export const ProjectPopover = () => {
    const {data} = useProjects({} as { name: string, personId: string })
    const {openCreateProject} = useProjectModal()
    const content = <List style={{minWidth: '20rem'}}>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        {
            data?.filter(item => item.pin).map(item => <List.Item key={item.id}>
                <List.Item.Meta title={item.name}/>
            </List.Item>)
        }
        <Button type={"link"} onClick={openCreateProject} style={{padding: 0}}>创建项目</Button>
    </List>

    return <Popover trigger={"hover"} content={content} placement={"bottom"}>
        <span>项目</span>
    </Popover>
}