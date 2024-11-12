import { Link } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"

import Logo from "../assets/Logo"
import { useState } from "react"

export default function _Nav() {

    const [expanded, setExpanded] = useState(false)

    const handleNavClick = () => setExpanded(false)

    return (
        <>
            <Navbar collapseOnSelect={true} expand='lg' className="my-3"
                expanded={expanded} onToggle={setExpanded}    
            >
                <Container>
                    <Navbar.Brand onClick={() => handleNavClick()}>
                        <Logo />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />

                    <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
                        <Nav fill className="ms-auto" variant="underline"> 
                            <Nav.Link as={Link} onClick={() => handleNavClick()} to='/name'>பெயர்கள்</Nav.Link>
                            <Nav.Link as={Link} onClick={() => handleNavClick()} to='/contact'>தொடர்பு</Nav.Link>
                            <Nav.Link as={Link} onClick={() => handleNavClick()} to='/about'>எங்களை பற்றி</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}


