import { useContext } from "react"
import { Link } from "react-router-dom"

import Header from "./Header"

import { NameContext } from "../context/NameContext"

const uyirgal = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ']
const meigal = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப',
                 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'] 

export default function Letters() {
    
    const { setSearch } = useContext(NameContext)

    return (
    <section>
        <Header>
            <h2>எழுத்துகள்</h2>
        </Header>

        <div>
            {/* <h3>உயிரெழுத்துகள்</h3> */}
            <div className="letters">
                {uyirgal.map(uyir => 
                    <Link to={`/name/${uyir}`} key={uyir} state={uyir} 
                        onClick={() => {setSearch(uyir)}}
                    >
                        <span className="letter">{uyir}</span>
                    </Link>
                )}
            </div>

            {/* <h3>மெய்யெழுத்துகள்</h3> */}
            <div className="letters">
                {meigal.map(mei => 
                    <Link to={`/name/${mei}`} key={mei} state={mei}
                        onClick={() => {setSearch(mei)}}
                    >
                        <span className="letter">{mei}</span>
                    </Link>
                )}
            </div>
        </div>
    </section>


  )
}