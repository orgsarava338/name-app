import { useContext, useEffect, useRef } from "react"

import { NameContext } from "../context/NameContext"
import { Container, FormControl, InputGroup } from "react-bootstrap"

export default function SearchBar() {

  const {search, setSearch} = useContext(NameContext)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(((e.key === "/") && e.ctrlKey || e.key == '/') && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef?.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)

  })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  
  return (
    <Container as='form' onSubmit={handleSubmit}>
      <InputGroup className="mb-3">

        <FormControl 
          type="text" 
          name="search" 
          id="search" 
          placeholder="search"
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
          <InputGroup.Text>/</InputGroup.Text>
      </InputGroup>

    </Container>
  )
}