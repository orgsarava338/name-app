import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import GithubIcon from "../../assets/icons/GithubIcons";
import TwitterIcon from "../../assets/icons/TwitterIcon";
import DiscordIcon from "../../assets/icons/DiscordIcon";

const legals = [
    {title: 'Privacy Policy', link: '/privacy_policy'},
    {title: 'terms & conditions', link: '/terms_and_conditions'},
]

const socialLinks = [
    { title: 'Discord Community', link: '#', Icon: DiscordIcon},
    { title: 'Twitter', link: '#', Icon: TwitterIcon},
    { title: 'Github Account', link: 'https://github.com/orgsarava338/name-app', Icon: GithubIcon},
]

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                
                <section className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Logo />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                {socialLinks.map(social => 
                                    <li className="mb-4">
                                        <a target="_blank" href={social.link} className="hover:underline">{social.title.split(' ')[0]}</a>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {legals.map(legal => 
                                    <li className="mb-4">
                                        <a href={legal.link} className="hover:underline">{legal.title}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
        
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                                
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024 
                        <Link to="/"><span className="hover:underline">பெயர் செயலி™</span></Link>
                        . All Rights Reserved.
                    </span>
                                
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {socialLinks.map(social => 
                            <a href={social.link} className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <social.Icon />
                                <span className="sr-only">{social.title}</span>
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </footer>
    )
}