import Cookies from "js-cookie";
import postAPI from "../../utils/postAPI";

const logout = () => {
    postAPI('/api/logout', {}, {}, logoutResponse, () => null);
}
    
const logoutResponse = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    window.location.href = '/#/login'
}


export default logout