import { useState } from "react"
import { Form, Button, Container, FormControl, FormGroup, FormLabel, Alert } from "react-bootstrap"

import { useNameContext } from "../../context/NameContext"

export default function NameAdd() {

    const [nameDetail, setNameDetail] = useState<IName | null>(null)

    const { addName, isLoading, error } = useNameContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameDetail({...nameDetail, [e.target.name] : e.target.value } as IName)
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(nameDetail) addName(nameDetail)
    }

    return (
        <Container as='main'>
            <header>
                <h1>Add new Name</h1>
            </header>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} >

                <FormGroup>
                    <FormLabel htmlFor="name">Name : </FormLabel>
                    <FormControl type="text" name="name" id="name" 
                        value={nameDetail ? nameDetail.name : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="nameInEnglish">Name in english : </FormLabel>
                    <FormControl type="text" name="nameInEnglish" id="nameInEnglish" 
                        value={nameDetail ? nameDetail.nameInEnglish : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="gender">Gender : </FormLabel>
                    <FormControl type="text" name="gender" id="gender" 
                        value={nameDetail ? nameDetail.gender : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="origin">Origin : </FormLabel>
                    <FormControl as='textarea' name="origin" id="origin" 
                        value={nameDetail ? nameDetail.origin || '' : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="description">Description : </FormLabel>
                    <FormControl as='textarea' name="description" id="description" 
                        value={nameDetail ? nameDetail.description : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="literatureEvidence">Literature Evidence : </FormLabel>
                    <FormControl as='textarea' name="literatureEvidence" id="literatureEvidence" 
                        value={nameDetail ? nameDetail.literatureEvidence || '' : ''} onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="epigraphEvidence">Epigraph Evidence : </FormLabel>
                    <FormControl as='textarea' name="epigraphEvidence" id="epigraphEvidence" 
                        value={nameDetail ? nameDetail.epigraphEvidence || '' : ''} onChange={handleChange}
                    />
                </FormGroup>

                <Button type="submit" active={!isLoading}>{isLoading ? 'saving...' : 'submit'}</Button>
            </Form>
        </Container>
    )
}