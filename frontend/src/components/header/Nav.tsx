import { useState } from 'react'
import { Link } from 'react-router-dom'

const navs = [
    { title: 'Home', path: '/' },
    { title: 'Names', path: '/names', },
    { title: 'Contact', path: '/contact' },
    { title: 'About', path: '/about' },
]

export default function Nav() {

    const [ active, setActive ] = useState('Home')

    return (
        <nav>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {navs.map(nav => {
                        const classes = active === nav.title 
                            ? 'block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500'
                            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'

                        return <li key={nav.title} className={classes} onClick={() => setActive(nav.title)}>
                            <Link to={nav.path}>{nav.title}</Link>
                        </li>
                    })}
                </ul>
            </div>
        </nav>
    )
}

