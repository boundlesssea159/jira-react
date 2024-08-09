import React from "react";
import {User} from "./list";


interface SearchPanelParam {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelParam["param"]) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelParam) => {
    return <form>
        <div>
            <input type={"text"} value={param.name} onChange={
                event => setParam({...param, name: event.target.value})}>
            </input>
            <select value={param.personId} onChange={
                event => setParam({...param, personId: event.target.value})}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}