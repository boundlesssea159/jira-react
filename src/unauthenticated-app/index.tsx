import React, {useState} from "react";
import {Button, Card} from "antd";
import styled from "@emotion/styled";
import head from 'assets/head.png';
import left from 'assets/left.jpg';
import right from 'assets/right.jpg';
import {Login} from "./login";
import {Register} from "./register";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    return (
        <Container>
            <Head src={head}/>
            <Background/>
            <ShadowCard>
                {!isRegister ? <Login setIsRegister={setIsRegister}/> :
                    <Register setIsRegister={setIsRegister}/>}
            </ShadowCard>
        </Container>
    )
}

const Head = styled.img`
  width: 10%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-image: url(${left}), url(${right});
  background-size: 50% 80%, 50% 80%;
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

export const LongButton = styled(Button)`
  width: 100%;
`

export const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`