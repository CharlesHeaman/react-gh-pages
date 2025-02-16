import { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import SubmitButton from "../../../form/SubmitButton/SubmitButton"

const Header = (props: {
    toggleNav: () => void,
    children?: ReactNode
}) => {
    const navigate = useNavigate();
    
    return (
        <>
            <header id='header'>
                <button
                    className='nav-toggle'
                    onClick={props.toggleNav}
                >
                    <span className="material-icons">menu</span>
                </button>
                <Link to={`/`}><img style={{ aspectRatio: 1, height: '32px'}} src={`${process.env.PUBLIC_URL}/logo-Placeholder.jpg`}/></Link>
                <nav>
                    <ul>
                        {props.children}
                    </ul>
                </nav>
                <button
                    className='nav-toggle logout'
                    onClick={() => navigate('login')}
                >
                    <span className="material-icons">logout</span>
                </button>          
            </header>
        </>
    )
}

export default Header