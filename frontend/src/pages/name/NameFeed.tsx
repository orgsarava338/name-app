import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Row, Spinner, Stack } from "react-bootstrap";

import editIcon from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import { useNameContext } from "../../context/NameContext";
import SearchBar from "../../components/SearchBar";

interface IProps {
    title?: string,
}

const maxDescriptionLength = 100

export default function NameFeed(props: IProps) {
    
    const { title = 'நீங்கள் தேடும் அனைத்து சிறந்த தமிழ் பெயர்கள்' } = props
    
    const { error, isLoading, searchNameResults, deleteName } = useNameContext()
    const navigate = useNavigate()

    const names = searchNameResults

    const handleEditClick = (nameDetail: IName) => {
        navigate(`/name/edit/${nameDetail.name}`)
    }

    const handleDeleteClick = (nameDetail: IName) => {
        deleteName(nameDetail.name)
    }

    return (
        <Container as='main'>

            <SearchBar />
            <>
                <header><h1>{title}</h1></header>
            
                { error && <Alert variant="danger">{error}</Alert> } 
                { isLoading && <Spinner /> } 

                <Row className="my-5" sm={3} lg={4}> {names.map(n => (
                        <Col key={n.name} xs={16} sm={12} md={6} lg={4} className="mb-md-4">
                            <Card >
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
                                        
                                        <Button variant="light" onClick={() => handleEditClick(n)} className="ms-auto text-nowrap">
                                            <img src={editIcon} alt="edit icon" />
                                        </Button>
                                        <Button variant="light" onClick={() => handleDeleteClick(n)} className="text-nowrap">
                                            <img src={deleteIcon} alt="delete icon" />
                                        </Button>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        </Container>
    )
}