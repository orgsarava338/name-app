import { Form, Button, Container, FormControl, FormGroup, FormLabel, Alert, Spinner } from "react-bootstrap";

import { useNameContext } from "../../context/NameContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NameEdit() {
    
    const { isLoading, error, updateName, nameDetail, setNameDetail, searchNameResults: names } = useNameContext()

    const params = useParams()

    useEffect(() => {
        const foundname = names.find(n => n.name === params.name || n.nameInEnglish.toLowerCase() === params.name?.toLowerCase())
        if(foundname) setNameDetail(foundname)
    }, [names, params.name])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    const handleEdit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateName()
    }

    return (
        <>
            {!nameDetail ? <Alert variant="danger"><p>name not found to edit</p></Alert>
                : (
                    <Container as='main'>
                        <header>
                            <h1>Edit the name <br /><code><b>{nameDetail.name}</b></code></h1> 
                        </header>

                        {isLoading && <Spinner /> }
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleEdit}>

                            <FormGroup>
                                <FormLabel htmlFor="nameInEnglish">Name in english : </FormLabel>
                                <FormControl type="text" name="nameInEnglish" id="nameInEnglish" required
                                    value={nameDetail.nameInEnglish || ''} onChange={handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="gender">Gender : </FormLabel>
                                <FormControl type="text" name="gender" id="gender" required
                                    value={nameDetail.gender || ''} onChange={handleChange}
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <FormLabel htmlFor="description">Description : </FormLabel>
                                <FormControl as='textarea' name="description" id="description" required
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

                            <Button type="submit" active={!isLoading}>{isLoading ? 'saving...' : 'submit'}</Button>
                        </Form>
                    </Container>
                )
            }
        </>
    )
}