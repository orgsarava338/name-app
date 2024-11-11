import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Col, Stack } from "react-bootstrap";

import { NameContext } from "../context/NameContext";

const uyirgal = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];
const meigal = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப',
                 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'];

export default function SearchContainer() {
    const { setSearch } = useContext(NameContext);
    const navigate = useNavigate()

    const handleClick = (letter: string) => {
        setSearch(letter)
        navigate(`/name/${letter}`)
    }

    return (
        <Container as="section" className="my-4">
            <header>
                <h2>எழுத்துகள்</h2>
            </header>

            <Stack className="mb-4">
                <Col xs={6} md={12} lg={12} className="my-3">
                    <Stack direction="horizontal" gap={1} className="flex-wrap">
                        {uyirgal.map((uyir) => (
                            <Button key={uyir} variant="primary" onClick={() => {handleClick(uyir)}}> {uyir} </Button>
                        ))}
                    </Stack>
                </Col>

                <Col xs={6} md={12} lg={18}>
                    <Stack direction="horizontal" gap={1} className="flex-wrap">
                        {meigal.map((mei) => (
                            <Button key={mei} variant="secondary" onClick={() => {handleClick(mei)}}> {mei} </Button>
                        ))}
                    </Stack>
                </Col>
            </Stack>
        </Container>
    );
}
