import React from "react"
import { Container } from "react-bootstrap"

interface IProps {
    code: string,
    children: React.ReactNode
}

export default function Error({code, children}: IProps) {
  return (
    <Container as='main'>
        <header>
            <h1>{code}</h1>
        </header>
        <section>
            {children}
        </section>
    </Container>
  )
}