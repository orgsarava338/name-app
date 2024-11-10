import { Params, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Content from "../../components/Content";
import { useContext } from "react";
import { NameContext } from "../../context/NameContext";
import Error from "../Error";

export default function NameEdit() {
    
    const {
        handleEdit, searchResults,
        nameDetail, setNameDetail,
    } = useContext(NameContext)

    const params: Params = useParams()

    const foundName = searchResults.find(n => n.name === params.name)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    return (
        <>
            {!foundName ? <Error code="404"><p>name not found to edit</p></Error>
                : (
                    <>
                        <Header>
                            <h1> edit the name <code>{nameDetail.name}</code></h1> 
                        </Header>

                        <Content>
                            <form onSubmit={handleEdit}>

                                <div>
                                    <label htmlFor="nameInEnglish">Name in english : </label>
                                    <input type="text" name="nameInEnglish" id="nameInEnglish" 
                                        value={nameDetail.nameInEnglish} onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender : </label>
                                    <input type="text" name="gender" id="gender" 
                                        value={nameDetail.gender} onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="description">Description : </label>
                                    <textarea name="description" id="description" 
                                        value={nameDetail.description} onChange={handleTextAreaChange}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="literatureEvidence">Literature Evidence : </label>
                                    <textarea name="literatureEvidence" id="literatureEvidence" 
                                        value={nameDetail.literatureEvidence} onChange={handleTextAreaChange}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="epigraphEvidence">Epigraph Evidence : </label>
                                    <textarea name="epigraphEvidence" id="epigraphEvidence" 
                                        value={nameDetail.epigraphEvidence} onChange={handleTextAreaChange}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="image">Image : </label>
                                    <input type="text" name="image" id="image" 
                                        value={nameDetail.image} onChange={handleInputChange}
                                    />
                                </div>

                                <button type="submit">submit</button>
                            </form>
                        </Content>
                    </>
                )
            }
        </>
    )
}