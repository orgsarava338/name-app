import HamburgerButton from "./HamburgerButton"
import Logo from "../../assets/Logo"
import Nav from "./Nav"

export default function Header() {

    return (
        <header className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <HamburgerButton />
                <Nav />
            </div>
        </header>
    )
}

