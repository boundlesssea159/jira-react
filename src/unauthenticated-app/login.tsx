import {Divider, Form, Input, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {LongButton, Title} from "./index";
import {useAuth} from "../context/auth-context";

export const Login = ({setIsRegister}: {
    setIsRegister: (isRegister: boolean) => void
}) => {

    const {login} = useAuth()
    const [error, setError] = useState<Error>();
    const handleSubmit = async (values: { username: string, password: string }) => {
        await login(values).catch((error) => setError(error))
    }

    useEffect(() => {
        setTimeout(() => {
            setError(undefined)
        }, 1000)
    }, [error])

    return <Form onFinish={handleSubmit}>
        <Title>{"请登录"}</Title>
        {error ? <Typography.Text type={"danger"}>{error.message.toString()}</Typography.Text> : null}
        <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} id={"username"} type={"text"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} id={"password"} type={"password"}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>{"登录"}</LongButton>
        </Form.Item>
        <Divider/>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a type={"button"}
           onClick={() => setIsRegister(true)}>{"没有账号？注册新账号"}</a>
    </Form>
}

