import React, {FormEvent} from "react";

export const LoginScreen = () => {

    const handleSubmit = (event: FormEvent) => {

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
                <button type={"button"}>登录</button>
            </form>
        </div>
    )
}