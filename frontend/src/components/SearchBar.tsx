import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { NameContext } from "../context/NameContext"

export default function SearchBar() {

  const {search, setSearch} = useContext(NameContext)

  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(search.trim()) navigate(`/name/${search.trim().toLowerCase()}`)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <input 
          type="text" 
          name="search" 
          id="search" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="search"
        />
      </label>
    </form>
  )
}