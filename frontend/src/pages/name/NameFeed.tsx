import { useContext } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Row, Spinner, Stack } from "react-bootstrap";

import Error from "../Error";

import Content from "../../components/Content";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";

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

    const names = searchResults

    return (
        <Content>
          <SearchBar />

            { isLoading ? <Spinner animation="border" role="status" variant="dark"></Spinner> 
                : error ? <Alert variant="danger">{error}</Alert>
                : names.length ? 
                    <>
                    <Header><h1>{title}</h1></Header>
                    
                    <Row> {names.map(n => (
                            <Col key={n.name} sm={3}>
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
                                                <Link to={`/${n.name}`}><Button>Know More</Button></Link>
                                                <Link to={`/name/edit/${n.name}`} className="ms-auto" onClick={() => {setNameDetail({...n})}}> 
                                                    <img src={editIcon} alt="edit icon" />
                                                </Link>
                                                <button className="btn btn-link">
                                                    <img src={deleteIcon} alt="delete icon" onClick={() => handleDelete(n.name)}/>
                                                </button>
                                            </Stack>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    </>
                : <Error code="404">No Name found</Error>
            }
        </Content>
    )
}