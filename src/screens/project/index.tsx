import {Link} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import {Kanban} from "../kanban";
import {Epic} from "../epic";
import {Tabs} from "antd";

export const ProjectScreen = () => {
    return <div style={{display: "flex"}}>
        <LeftMenu/>
        <div style={{flex: 1}}>
            <Routes>
                <Route path={"kanban"} element={<Kanban/>}/>
                <Route path={"epic"} element={<Epic/>}/>
                <Route path={"*"} element={<Navigate to={"kanban"} replace={true}/>}/>
            </Routes>
        </div>
    </div>
}

const LeftMenu = () => {
    return <Tabs
        tabPosition={'left'}
        items={[
            {
                label: '看板',
                key: 'kanban',
                children: <Link to={"kanban"}/>,
            },
            {
                label: '任务组',
                key: 'epic',
                children: <Link to={"epic"}/>,
            },
        ]}
    />
}