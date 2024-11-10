import { useContext } from "react"
import { Link } from "react-router-dom"

import Header from "./Header"

import { NameContext } from "../context/NameContext"
import { Container, Stack } from "react-bootstrap"

const uyirgal = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ']
const meigal = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப',
                 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'] 

export default function Letters() {
    
    const { setSearch } = useContext(NameContext)

    return (
    <Container as='section'>
        <Header>
            <h2>எழுத்துகள்</h2>
        </Header>

        <Container>
            {/* <h3>உயிரெழுத்துகள்</h3> */}
            <Stack direction="horizontal">
                {uyirgal.map(uyir => 
                    <Link to={`/name/${uyir}`} key={uyir} state={uyir} 
                        onClick={() => {setSearch(uyir)}}
                    >
                        <span className="letter">{uyir}</span>
                    </Link>
                )}
            </Stack>

            {/* <h3>மெய்யெழுத்துகள்</h3> */}
            <Stack direction="horizontal">
                {meigal.map(mei => 
                    <Link to={`/name/${mei}`} key={mei} state={mei}
                        onClick={() => {setSearch(mei)}}
                    >
                        <span className="letter">{mei}</span>
                    </Link>
                )}
            </Stack>
        </Container>
    </Container>
  )
}