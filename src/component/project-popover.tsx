import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/projects";
import {useEffect} from "react";


export const ProjectPopover = (props: { setOpenProjectModal: (open: boolean) => void }) => {
    const {getProjects, data} = useProjects()

    useEffect(() => {
        getProjects({} as { name: string, personId: string })
    }, [getProjects])

    const content = <List style={{minWidth: '20rem'}}>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        {
            data?.filter(item => item.pin).map(item => <List.Item key={item.id}>
                <List.Item.Meta title={item.name}/>
            </List.Item>)
        }
        <Button type={"link"} onClick={() => props.setOpenProjectModal(true)} style={{padding: 0}}>创建项目</Button>
    </List>

    return <Popover trigger={"hover"} content={content} placement={"bottom"}>
        <span>项目</span>
    </Popover>
}