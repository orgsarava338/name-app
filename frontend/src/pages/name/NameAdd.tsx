import { useContext, useEffect } from "react"
import { Form, Button, Container, FormControl, FormGroup, FormLabel } from "react-bootstrap"

import Name from "../../utils/Name"

import { NameContext } from "../../context/NameContext"

export default function NameAdd() {

    const { handleAdd, nameDetail, setNameDetail } = useContext(NameContext)

    useEffect(() => {
        if(!nameDetail) setNameDetail(new Name())
    }, [nameDetail, setNameDetail])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameDetail({...nameDetail, [e.target.name] : e.target.value })
    }

    return (
        <Container as='main'>
            <header>
                <h1>Add new Name</h1>
            </header>

            <Form onSubmit={handleAdd} >

                <FormGroup>
                    <FormLabel htmlFor="name">Name : </FormLabel>
                    <FormControl type="text" name="name" id="name" 
                        value={nameDetail.name || ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="nameInEnglish">Name in english : </FormLabel>
                    <FormControl type="text" name="nameInEnglish" id="nameInEnglish" 
                        value={nameDetail.nameInEnglish || ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="gender">Gender : </FormLabel>
                    <FormControl type="text" name="gender" id="gender" 
                        value={nameDetail.gender || ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="description">Description : </FormLabel>
                    <FormControl as='textarea' name="description" id="description" 
                        value={nameDetail.description || ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="literatureEvidence">Literature Evidence : </FormLabel>
                    <FormControl as='textarea' name="literatureEvidence" id="literatureEvidence" 
                        value={nameDetail.literatureEvidence || ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="epigraphEvidence">Epigraph Evidence : </FormLabel>
                    <FormControl as='textarea' name="epigraphEvidence" id="epigraphEvidence" 
                        value={nameDetail.epigraphEvidence || ''} onChange={handleChange}
                    />
                </FormGroup>

                <Button type="submit">submit</Button>
            </Form>
        </Container>
    )
}