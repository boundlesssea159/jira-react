import {useNavigate} from "react-router-dom";
import {Navigate, Route, Routes, useLocation} from "react-router";
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
    const location = useLocation()
    const navigate = useNavigate()
    const activeKey = location.pathname.split('/').pop()
    return <Tabs
        tabPosition={'left'}
        activeKey={activeKey}
        onChange={(key) => navigate(key)}
        items={[
            {
                label: '看板',
                key: 'kanban',
            },
            {
                label: '任务组',
                key: 'epic',
            },
        ]}
    />
}