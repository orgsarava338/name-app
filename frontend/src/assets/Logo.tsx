import { Link } from "react-router-dom"

export default function Logo() {
    return (
        <Link to="/">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="" className="h-8" alt="பெயர் செயலி" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">பெயர் செயலி</span>
            </div>
        </Link>
    )
}