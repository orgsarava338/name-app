import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Row, Spinner, Stack } from "react-bootstrap";

import Error from "../Error";

import editIcon from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import { NameContext } from "../../context/NameContext";

interface IProps {
    title?: string,
}

const maxDescriptionLength = 100

export default function NameFeed(props: IProps) {
    
    const { title = 'நீங்கள் தேடும் அனைத்து சிறந்த தமிழ் பெயர்களும்' } = props
    
    const { error, isLoading, searchResults, handleDelete, setNameDetail } = useContext(NameContext)
    const navigate = useNavigate()

    const names = searchResults

    const handleEditClick = (nameDetail: IName) => {
        setNameDetail({...nameDetail})
        navigate(`/name/edit/${nameDetail.name}`)
    }

    return (
        <Container as='main'>
            { isLoading ? <Spinner animation="border" role="status" variant="dark"></Spinner> 
                : error ? <Alert variant="danger">{error}</Alert>
                : names.length ? 
                    <>
                    <header><h1>{title}</h1></header>
                    
                    <Row className="my-5" sm={3} lg={4}> {names.map(n => (
                            <Col key={n.name}>
                                <Card className="">
                                    <Card.Body>
                                        <Card.Title><h2>{n.name}</h2></Card.Title>
                                        <Card.Text>
                                            {n.description.length < maxDescriptionLength
                                                ? n.description
                                                : `${n.description.slice(0, maxDescriptionLength)}...`
                                            }
                                        </Card.Text>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button onClick={() => navigate(`/${n.name}`)}>Know More</Button>
                                                
                                                <Button variant="light" onClick={() => handleEditClick(n)}>
                                                    <img src={editIcon} alt="edit icon" />
                                                </Button>
                                                <Button variant="light" onClick={() => handleDelete(n.name)}>
                                                    <img src={deleteIcon} alt="delete icon" />
                                                </Button>
                                            </Stack>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    </>
                : <Error code="404">No Name found</Error>
            }
        </Container>
    )
}