import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

export default function Content({children}: IProps) {
  return (
    <main>
        {children}
    </main>
  )
}

