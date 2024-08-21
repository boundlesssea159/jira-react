import React, {useState} from "react";
import {useAuth} from "../context/auth-context";
import {Button, Card, Divider, Form, Input} from "antd";
import styled from "@emotion/styled";
import head from 'assets/head.png';
import left from 'assets/left.jpg';
import right from 'assets/right.jpg';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const {login, register} = useAuth()
    const handleSubmit = (values: { username: string, password: string }) => {
        isRegister ? register(values).catch((error) => alert(error))
            : login(values).catch((error) => alert(error))
    }

    return (
        <Container>
            <Head src={head}/>
            <Background/>
            <ShadowCard>
                <Title>{isRegister ? "请注册" : "请登录"}</Title>
                <Form onFinish={handleSubmit}>
                    <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
                        <Input placeholder={"用户名"} id={"username"} type={"text"}/>
                    </Form.Item>
                    <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
                        <Input placeholder={"密码"} id={"password"} type={"password"}/>
                    </Form.Item>
                    <Form.Item>
                        <LongButton htmlType={"submit"} type={"primary"}>{isRegister ? "注册" : "登录"}</LongButton>
                    </Form.Item>
                </Form>
                <Divider/>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a type={"button"}
                   onClick={() => setIsRegister(!isRegister)}>{`${isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}`}</a>
            </ShadowCard>
        </Container>
    )
}

const Head = styled.img`
  width: 5%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-image: url(${left}), url(${right});
  background-size: 50% 80%,50% 80%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`