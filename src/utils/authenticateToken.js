import Axios from 'axios';
import Cookies from 'js-cookie';

const authenticateToken = async (requirements, navigate) => {
    Axios.post(process.env.REACT_APP_API_URL + '/api/authenticate', { requirements: requirements }, { 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        }
    }).catch(() => {
        let redirect = window.location.hash.replace("#", "")
        navigate('/login', { state: { redirect: redirect } })
    });
}

export default authenticateToken