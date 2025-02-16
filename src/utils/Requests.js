import Axios from 'axios';
import Cookies from 'js-cookie';

Axios.interceptors.response.use(undefined, (err) => {
    const { config, response } = err;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }
    config.retry -= 1;
    const delayRetryRequest = new Promise((resolve) => {
        if (response.status === 401 && (response.data && response.data.message === "jwt expired")) {
            refreshAccessToken(config)
        }
        setTimeout(() => {
            resolve();
        }, config.retryDelay || 1000);
    });
    return delayRetryRequest.then(() => Axios(config));
});

function refreshAccessToken(config) {
    Axios.post(process.env.REACT_APP_API_URL + '/api/refresh', {
        token: Cookies.get('refreshToken')
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        }
    }).then((response) => {
        Cookies.set('accessToken', response.data.accessToken, { sameSite: 'strict' });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
    })
}
function post(url, params, body, responseFunction, errorFunction, submittingSetter) {
    submittingSetter && submittingSetter(true);
    Axios.post(process.env.REACT_APP_API_URL + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params
    }).then((response) => {
        responseFunction && responseFunction(response);
        submittingSetter && submittingSetter(false);
    }).catch(function (error) {
        submittingSetter && submittingSetter(false);
        handleRequestError(error, errorFunction);
    });
}

function put(url, params, body, responseFunction, errorFunction, submittingSetter) {
    submittingSetter && submittingSetter(true);
    Axios.put(process.env.REACT_APP_API_URL + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params
    }).then((response) => {
        responseFunction && responseFunction(response);
        submittingSetter && submittingSetter(false);
    }).catch(function (error) {
        submittingSetter && submittingSetter(false);
        handleRequestError(error, errorFunction);
    });
}

function get(url, params, responseFunction, errorFunction) {
    Axios.get(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params,
        retry: 3, 
        retryDelay: 200 
    }).then((response) => {
        responseFunction && responseFunction(response)
    }).catch(function (error) {
        handleRequestError(error, errorFunction);
    });
}

function trackerGet(url, params, responseFunction, errorFunction) {
    Axios.get(process.env.REACT_APP_TRACKER_API_URL + url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params,
        retry: 3, 
        retryDelay: 200 
    }).then((response) => {
        responseFunction && responseFunction(response)
    }).catch(function (error) {
        handleRequestError(error, errorFunction);
    });
}

function postFormData(url, params, body, responseFunction, errorFunction, submittingSetter) {
    if (submittingSetter) {
        submittingSetter(true);
    }
    Axios.post(process.env.REACT_APP_API_URL + url, body, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${Cookies.get('accessToken')}`
        },
        params: params
    }).then((response) => {
        responseFunction && responseFunction(response);
        submittingSetter && submittingSetter(false);
    }).catch((error) => {
        handleRequestError(error, errorFunction);
    });
}

function handleRequestError(error, errorFunction) {
    if (error.response) {
        if (error.response.status === 403 || error.response.status === 401) {
            let redirect = window.location.hash.replace("#", "")
            window.history.replaceState({ redirect: redirect}, '', '/#/login')
            window.location.reload();
        }
        if (errorFunction) {   
            errorFunction(error.response);
        } else {
            console.log(error.response)
        }
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
}

export { post, put, get, postFormData, trackerGet }

