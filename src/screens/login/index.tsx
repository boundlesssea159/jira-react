import React, {FormEvent} from "react";


// todo
// 1. 登录页和注册页的切换
// 2. 登录状态的记录，登录状态下要展示列表页
const serviceUrl = process.env.REACT_APP_API_URL
export const LoginScreen = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
        const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
        fetch(`${serviceUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(async response => {
            if (response.ok) {
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>用户名</label>
                    <input id={"username"} type={"text"}/>
                </div>
                <div>
                    <label>密码</label>
                    <input id={"password"} type={"password"}/>
                </div>
                <button type={"submit"}>登录</button>
            </form>
        </div>
    )
}