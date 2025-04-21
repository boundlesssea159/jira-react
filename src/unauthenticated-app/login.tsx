import {Divider, Form, Input, Typography} from "antd";
import React from "react";
import {LongButton, Title} from "./index";
import {useAuth} from "../context/auth-context";
import {useAsync} from "../utils/use-async";
import {Link} from "react-router-dom";

export const Login = () => {
    const {login} = useAuth()
    const {run, isLoading, error} = useAsync()

    return <Form onFinish={async (values: { username: string, password: string }) => {
        await run(login(values))
    }}>
        <Title>{"请登录"}</Title>
        {error !== null ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
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
        <Link to={"/register"}>{"没有账号？注册新账号"}</Link>
    </Form>
}

