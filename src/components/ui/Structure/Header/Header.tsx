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
                <Link to={`/`}><img style={{ aspectRatio: 1, height: '32px'}} src={`${process.env.PUBLIC_URL}/mitchells.png`}/></Link>
                <nav>
                    <ul>
                        {props.children}
                    </ul>
                </nav>
                <SubmitButton
                    iconFont="priority_high"
                    text="Not Live Data"
                    color="red"
                    clickFunc={() => null}
                />
                <button
                    className='nav-toggle'
                    onClick={() => navigate('login')}
                >
                    <span className="material-icons">logout</span>
                </button>          
            </header>
        </>
    )
}

export default Header