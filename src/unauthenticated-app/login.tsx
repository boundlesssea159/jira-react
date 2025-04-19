import {Divider, Form, Input, Typography} from "antd";
import React from "react";
import {LongButton, Title} from "./index";
import {useAuth} from "../context/auth-context";
import {useAsync} from "../utils/use-async";

export const Login = ({setIsRegister}: {
    setIsRegister: (isRegister: boolean) => void
}) => {

    const {login} = useAuth()
    const {run, isLoading, error} = useAsync()

    return <Form onFinish={async (values: { username: string, password: string }) => {
        await run(login(values))
    }}>
        <Title>{"请登录"}</Title>
        {error ? <Typography.Text type={"danger"}>{error}</Typography.Text> : null}
        <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} id={"username"} type={"text"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} id={"password"} type={"password"}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>{"登录"}</LongButton>
        </Form.Item>
        <Divider/>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a type={"button"}
           onClick={() => setIsRegister(true)}>{"没有账号？注册新账号"}</a>
    </Form>
}

