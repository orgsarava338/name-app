interface IProps {
  children: React.ReactNode
}

export default function Header({children}: IProps) {
  return (
    <header>
        {children}
    </header>
  )
}