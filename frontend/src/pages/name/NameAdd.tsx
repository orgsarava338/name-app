import { useContext } from "react"
import Content from "../../components/Content"
import Header from "../../components/Header"
import { NameContext } from "../../context/NameContext"

export default function NameAdd() {

    const {
        handleSubmit,
        nameDetail, setNameDetail,
    } = useContext(NameContext)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameDetail((nameDetail: IName) => ({...nameDetail, [e.target.name] : e.target.value }))
    }

    return (
        <>
            <Header>
                <h1>Add new Name</h1>
            </Header>

            <Content>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="name">Name : </label>
                        <input type="text" name="name" id="name" 
                            value={nameDetail.name} onChange={handleInputChange}
                        />
                    </div>

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