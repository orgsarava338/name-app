import { Link } from "react-router-dom";

const legals = [
    {title: 'தனியுரிமைக் கொள்கை', link: '/privacy_policy'},
    {title: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்', link: '/terms_and_conditions'},
    {title: 'பொறுப்புத் துறப்பு', link: '/disclaimer'},
]

export default function Footer() {
    return (
        <footer>

            <hr />
            <hr />

            <section>
                <div>
                    <h4>விதிமுறைகள்</h4>
                    <ul className="flex-box">
                    {legals.map(legal => 
                            <li key={legal.title}>
                                <small>
                                    <Link to={legal.link}>{legal.title}</Link>
                                </small> 
                            </li>
                        )}
                    </ul>
                </div>

                <h5>
                    <small>
                        பதிப்புரிமை &copy; {new Date().getFullYear()} <Link to="/">பெயர் செயலி™</Link>
                    </small>
                </h5>

            </section>
        </footer>
    )
}