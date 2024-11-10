import { Container } from "react-bootstrap"

interface IProps {
  children: React.ReactNode
}

export default function Header({children}: IProps) {
  return (
    <Container as='header'>
        {children}
    </Container>
  )
}