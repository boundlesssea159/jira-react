import React from "react";


export interface User {
    id: string,
    name: string
}

interface Project {
    "id": number,
    "name": string,
    "personId": string,
    "organization": string,
    "created": string
}

export const List = ({list, users}: { list: Project[], users: User[] }) => {
    return <table>
        <thead>
        <tr>
            <th>名词</th>
            <th>负责人</th>
        </tr>
        </thead>

        <tbody>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                <td>{users.find(user => user.id === project.personId)?.name || "未知"}</td>
            </tr>)
        }
        </tbody>
    </table>
}