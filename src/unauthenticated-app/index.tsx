import React, {useState} from "react";
import {useAuth} from "../context/auth-context";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const {login, register} = useAuth()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        isRegister ? register({username, password}).catch(() => alert("服务器错误"))
            : login({username, password}).catch(() => alert("用户名或密码错误"))
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
                <button type={"submit"}>{isRegister ? "注册" : "登录"}</button>
            </form>
            <button type={"button"}
                    onClick={() => setIsRegister(!isRegister)}>{`切换到${isRegister ? "登录" : "注册"}`}</button>
        </div>
    )
}