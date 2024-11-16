import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosGet from "../hooks/useAxiosGet";

import Name from "../utils/Name";

interface IProps {
    children: ReactNode
}

export const NameContext = createContext<INameContext>({
    search: '', setSearch: () => {},
    searchResults: [] as IName[], setSearchResults: () => {},
    names: [] as IName[], setNames: () => {},
    nameDetail: {} as IName, setNameDetail: () => {},
    handleAdd: () => {},
    handleEdit: () => {},
    handleDelete: () => {},
    error: null,
    isLoading: false,
})

export default function NameProvider({children}: IProps) {
    
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([] as IName[])
  
    const [names, setNames] = useState([] as IName[])
    const [nameDetail, setNameDetail] = useState({} as IName)
    
    const navigate = useNavigate()
    const { data, error, isLoading } = useAxiosGet('/name', {
        headers: {
            'Cache-Control': 'public',
            'pragma': 'public',
        }
    })
    
    useEffect(() => {
        setNames(data)
        setNameDetail(new Name())
    }, [data])

    useEffect(() => {
      setSearchResults(names.filter(n => 
            n.name.toLowerCase().includes(search.toLowerCase()) 
            || n.nameInEnglish.toLowerCase().includes(search.toLowerCase())            
      ).sort((a: IName, b: IName) => a.name.toLowerCase().startsWith(search.toLowerCase())
            ? 1
            : a.name.localeCompare(b.name, 'ta')
        )
    )
    }, [names, search])

    const handleAdd = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const newName = {...nameDetail}
    
        if(newName.name && newName.nameInEnglish && newName.description && newName.gender) {
            
            setNames(names => [...names, newName])
            navigate('/')
            setNameDetail(new Name())
        } else alert("these fields can't be empty : name, nameInEnglish, description, gender")
      }

      const handleEdit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(nameDetail.name && nameDetail.nameInEnglish && nameDetail.description && nameDetail.gender) {
            
            setNames(names.map((n: IName) => n.name === nameDetail.name ? {...nameDetail} : n))
            navigate(`/${nameDetail.name}`)
            setNameDetail(new Name())

        } else alert("these fields can't be empty : nameInEnglish, description, gender")
    }

    const handleDelete = (name: string) => {
        setNames(names.filter(n => n.name !== name))
    }

    return (
        <NameContext.Provider value={{
            search, setSearch,
            searchResults, setSearchResults,
    
            names, setNames,
            nameDetail, setNameDetail,
    
            handleAdd,
            handleEdit,
            handleDelete,
    
            error, isLoading,
        }}>
            {children}
        </NameContext.Provider>
    )
}
