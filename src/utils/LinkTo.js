import { Link } from 'react-router-dom';

function LinkTo(props) {
    return (
        <Link to={props.to} className={props.className} style={{ textDecoration: 'none'}} target={!props.redirect ? "_blank" : ''} rel={!props.redirect ? "noopener noreferrer" : ''}>
            {props.children}
        </Link>
    )
}

export default LinkTo