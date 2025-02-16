import Axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';

const deleteAPI = (
    apiEndpoint: string,
	params: any,
	responseFunction: (response: any) => void,
	loadingSetter: Dispatch<SetStateAction<boolean>>
) => {
    loadingSetter(true);
	Axios.delete(`${process.env.REACT_APP_API_URL}/api/${apiEndpoint}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params
    }).then((response) => {
        responseFunction(response);
        loadingSetter(false);
    }).catch((error) => {
        if (error.response.status === 403 || error.response.status === 401) {
            let redirect = window.location.hash.replace("#", "");
            window.history.replaceState({ redirect: redirect}, '', '/#/login');
            window.location.reload();
        }
    });
}

export default deleteAPI