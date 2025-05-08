import {Link} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import {Kanban} from "../kanban";
import {Epic} from "../epic";

export const ProjectScreen = () => {
    return <>
        <h1>ProjectScreen</h1>
        <Link to={"kanban"}>看板</Link>
        <br/>
        <Link to={"epic"}>任务组</Link>
        <Routes>
            <Route path={"kanban"} element={<Kanban/>}/>
            <Route path={"epic"} element={<Epic/>}/>
            <Route path={"*"} element={<Navigate to={"kanban"} replace={true}/>}/>
        </Routes>
    </>
}