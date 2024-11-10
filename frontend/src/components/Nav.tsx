import { Link } from "react-router-dom"
import { Container, Stack } from "react-bootstrap"

import Logo from "../assets/Logo"

// const navs = [
//     { title: 'முகப்பு', path: '/' },
//     { title: 'பெயர்கள்', path: '/name', },
//     { title: 'தொடர்பு', path: '/contact' },
//     { title: 'எங்களை பற்றி', path: '/about' },
// ]

export default function Nav() {
    return (
        <Container as='nav' className="my-5">
            <Stack direction="horizontal" gap={5}>
                <Logo />
                <Link to='/' className="ms-auto">முகப்பு</Link>
                <Link to='/name'>பெயர்கள்</Link>
                <Link to='/contact'>தொடர்பு</Link>
                <Link to='/about'>எங்களை பற்றி</Link>
            </Stack>
        </Container>
    )
}

