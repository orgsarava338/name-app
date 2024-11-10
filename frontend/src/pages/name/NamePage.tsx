import React, { useContext } from 'react'
import type {Params} from 'react-router-dom'
import { Link, useNavigate, useParams } from "react-router-dom"

import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'

import Error from '../Error'
import Content from '../../components/Content'

import { NameContext } from '../../context/NameContext'
import { Stack } from 'react-bootstrap'

export default function NamePage() {
    
    const {
        names, handleDelete,
        setNameDetail,
    } = useContext(NameContext)
    const { name } : Params = useParams();

    const foundName: IName | undefined = names.find((n:IName) => n.name.toString() == name)

    return (
        <>  
            {!foundName ? 
            <Error code='404'>
                <p>Name not found</p>
            </Error> :

                <Content>
                    <article className='name-detail'>
                        <h1>{foundName.name}</h1>

                        <p>பெயர் ஆங்கிலத்தில் : {foundName.nameInEnglish}</p>
                        
                        {foundName.image && <img src={foundName.image} alt={`${foundName.name} name's related image`}/>}

                        <p>பாலினம் : {foundName.gender}</p>
                        <p>விளக்கம் : {foundName.description}</p>
                        
                        { foundName.origin && <p>தோற்றம் : {foundName.origin}</p>}
                        { foundName.epigraphEvidence && <p>கல்வெட்டுச் சான்று : {foundName.epigraphEvidence}</p>}
                        { foundName.literatureEvidence && <p>இலக்கியச் சான்று : {foundName.literatureEvidence}</p>}

                        <Stack className="mt-3" direction="horizontal" gap={2}>
                            <Link to={`/name/edit/${foundName.name}`} className='ms-auto' onClick={() => {setNameDetail({...foundName})}}> 
                                <img src={editIcon} alt="edit icon" />
                            </Link>
                            <button className="btn btn-link">
                                <img src={deleteIcon} alt="delete icon" onClick={() => handleDelete(foundName.name)}/>
                            </button>
                        </Stack>

                    </article>
                </Content>
            }
        </>
    )
}