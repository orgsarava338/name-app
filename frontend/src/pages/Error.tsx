import React from "react"

import Header from "../components/Header"
import Content from "../components/Content"

interface IProps {
    code: string,
    children: React.ReactNode
}

export default function Error({code, children}: IProps) {
  return (
    <>
        <Header>
            {code}
        </Header>
        <Content>
            {children}
        </Content>
    </>
  )
}