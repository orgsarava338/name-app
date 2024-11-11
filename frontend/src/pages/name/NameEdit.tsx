import { useContext } from "react";
import { Form, Button, Container, FormControl, FormGroup, FormLabel } from "react-bootstrap";

import Error from "../Error";

import { NameContext } from "../../context/NameContext";

export default function NameEdit() {
    
    const { handleEdit, nameDetail, setNameDetail } = useContext(NameContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    return (
        <>
            {!nameDetail ? <Error code="404"><p>name not found to edit</p></Error>
                : (
                    <Container as='main'>
                        <header>
                            <h1>Edit the name <br /><code><b>{nameDetail.name}</b></code></h1> 
                        </header>

                        <Form onSubmit={handleEdit}>

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
        </>
    )
}