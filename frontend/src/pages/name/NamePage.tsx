import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import type {Params} from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Stack } from 'react-bootstrap'

import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'

import CommentSection from '../../components/comment/CommentSection'

import { useNameContext } from '../../context/NameContext'
import CommentProvider from '../../context/CommentContext'

export default function NamePage() {
    
    const { searchNameResults: names, getName, deleteName } = useNameContext()
    const { name } : Params = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        if(name) getName(name)
    }, [name, names])

    const foundName = names.find(n => n.name === name)

    const handleEditClick = (nameDetail: IName) => {
        navigate(`/name/edit/${nameDetail.name}`)
    }

    const handleDeleteClick = (nameDetail: IName) => {
        deleteName(nameDetail.name)
        navigate('/')
    }

    return (
        <Container as='main'>  
            <Helmet>
                <title>பெயர் செயலி || பெயர் {foundName ? ` - ${foundName.name} | ${foundName.nameInEnglish}` : ''}</title>
                <meta name='description' content={foundName?.description || ''}/>
            </Helmet>
            {!foundName ? <h2>No name found</h2>
                :
                <article>
                    <section>
                        <h1>{foundName.name}</h1>

                        <p>பெயர் ஆங்கிலத்தில் : {foundName.nameInEnglish}</p>
                            
                        <p>பாலினம் : {foundName.gender}</p>
                        <p>விளக்கம் : {foundName.description}</p>
                            
                        { foundName.origin && <p>தோற்றம் : {foundName.origin}</p>}
                        { foundName.epigraphEvidence && <p>கல்வெட்டுச் சான்று : {foundName.epigraphEvidence}</p>}
                        { foundName.literatureEvidence && <p>இலக்கியச் சான்று : {foundName.literatureEvidence}</p>}

                        <Stack className="mt-3" direction="horizontal" gap={2}>
                            <Button variant="light" className='ms-auto' onClick={() => handleEditClick(foundName)}>
                                <img src={editIcon} alt="edit icon" />
                            </Button>
                            <Button variant="light" onClick={() => handleDeleteClick(foundName)}>
                                <img src={deleteIcon} alt="delete icon" />
                            </Button>
                        </Stack>
                    </section>

                    <section>
                        <CommentProvider nameId={foundName._id}>
                            <CommentSection />
                        </CommentProvider>
                    </section>
                </article>
            }
        </Container>
    )
}