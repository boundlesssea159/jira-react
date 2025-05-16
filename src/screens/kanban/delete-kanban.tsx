import {useDeleteKanban, useKanbansQueryKey} from "../../utils/kanban";
import {Button, Dropdown} from "antd";
import React from "react";

export const DeleteKanban = (props: { kanbanId: number }) => {
    const queryKey = useKanbansQueryKey();
    const mutate = useDeleteKanban(queryKey)
    return <Dropdown menu={{
        items: [
            {
                key: "delete",
                label: (
                    <Button key={'deleteKanban'} type={"link"}
                            onClick={() => mutate.mutate({id: props.kanbanId})}>删除</Button>)
            },
        ]
    }}>
        <Button key={'default'} type={"link"} onClick={(e) => e.preventDefault()}>...</Button>
    </Dropdown>
}