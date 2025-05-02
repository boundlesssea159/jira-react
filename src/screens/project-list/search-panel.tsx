import React from "react";
import {Form, Input, Select} from "antd";
import {User} from "../../auth-provider";


interface SearchPanelParam {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelParam["param"]) => void
}

export const SearchPanel = ({users, param, setParam}: SearchPanelParam) => {
    return <Form layout={"inline"} style={{marginBottom: '2rem'}}>
        <Form.Item>
            <Input onChange={(event) => {
                setParam({...param, name: event.target.value})
            }}/>
        </Form.Item>
        <Form.Item>
            <Select defaultValue={"负责人"} options={[{value: "", label: "负责人"}, ...users.map(user => {
                return {value: user.id, label: user.name}
            })]} onChange={value => {
                setParam({...param, personId: value})
            }}/>
        </Form.Item>
    </Form>
}