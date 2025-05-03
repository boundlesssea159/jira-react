import {useUsers} from "../utils/users";
import {useEffect, useState} from "react";
import {Select} from "antd";

type UserSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const UserSelect = ({value, onChange}: UserSelectProps) => {
    const {data: users} = useUsers()
    const [labels, setLabels] = useState<{ value: string, label: string }[]>([])
    useEffect(() => {
        const labels = users.map(user => {
            return {value: user.id, label: user.name}
        })
        setLabels(labels)
    }, [users])

    return <Select
        defaultValue="负责人"
        value={value}
        onChange={onChange}
        options={labels}
    />
}