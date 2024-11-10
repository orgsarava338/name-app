import { ReactNode } from "react"
import { Container } from "react-bootstrap"

interface IProps {
    children: ReactNode
}

export default function Content({children}: IProps) {
  return (
    <Container as="main">
        {children}
    </Container>
  )
}

