import React, {useState} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Card, Form, Input} from "antd";


export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const {login, register} = useAuth()
    const handleSubmit = (values: { username: string, password: string }) => {
        isRegister ? register(values).catch((error) => alert(error))
            : login(values).catch((error) => alert(error))
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card>
                <Form onFinish={handleSubmit}>
                    <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
                        <Input placeholder={"用户名"} id={"username"} type={"text"}/>
                    </Form.Item>
                    <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
                        <Input placeholder={"密码"} id={"password"} type={"password"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} type={"primary"}>{isRegister ? "注册" : "登录"}</Button>
                    </Form.Item>
                </Form>
                <button type={"button"}
                        onClick={() => setIsRegister(!isRegister)}>{`切换到${isRegister ? "登录" : "注册"}`}</button>
            </Card>
        </div>
    )
}