import {Divider, Form, Input, Typography} from "antd";
import {LongButton, Title} from "./index";
import React, {useEffect, useState} from "react";
import {useAuth} from "../context/auth-context";

export const Register = ({setIsRegister}: {
    setIsRegister: (isRegister: boolean) => void
}) => {
    const {register} = useAuth()
    const [error, setError] = useState<Error>();
    const handleSubmit = async (values: { username: string, password: string, repeatPassword: string }) => {
        if (values.password !== values.repeatPassword) {
            setError(new Error("两次密码不一致"));
            return;
        }
        await register(values).catch((error) => setError(error))
    }

    useEffect(() => {
        setTimeout(() => {
            setError(undefined)
        }, 1000)
    }, [error])

    return <Form onFinish={handleSubmit}>
        <Title>{"请注册"}</Title>
        {error ? <Typography.Text type={"danger"}>{error.message.toString()}</Typography.Text> : null}
        <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} id={"username"} type={"text"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} id={"password"} type={"password"}/>
        </Form.Item>
        <Form.Item name={"repeatPassword"} rules={[{required: true, message: "请再次输入密码"}]}>
            <Input placeholder={"再次输入密码"} id={"repeatPassword"} type={"password"}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>{"注册"}</LongButton>
        </Form.Item>
        <Divider/>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a type={"button"}
           onClick={() => setIsRegister(false)}>{"已经有账号了？直接登录"}</a>
    </Form>
}