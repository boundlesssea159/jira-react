import React from "react";
import {User} from "./list";
import {Form, Input, Select} from "antd";


interface SearchPanelParam {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelParam["param"]) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelParam) => {
    return <Form>
        <Input onChange={(event) => {
            setParam({...param, name: event.target.value})
        }}/>
        <Select defaultValue={"负责人"} options={[{value: "", label: "负责人"}, ...users.map(user => {
            return {value: user.id, label: user.name}
        })]} onChange={value => {
            setParam({...param, personId: value})
        }}/>
    </Form>
}