import axios from 'axios';

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

export const BASE_URL = 'https://orca-app-4n9ni.ondigitalocean.app'
// export const BASE_URL = 'http://127.0.0.1:8000'
export const REDIRECT_URL = 'https://urchin-app-zje85.ondigitalocean.app'
// export const BASE_URL = 'http://agamibangla.pythonanywhere.com'

const authFetch = axios.create({
    baseURL: BASE_URL,
    // timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json', 
        'accept': 'application/json', 
    }
});

authFetch.interceptors.request.use(
    (request)=>{
        request.headers.common['Accept'] = 'application/json';
        // console.log(request)
        return request;
    }, 
    (error)=>{
        return Promise.reject(error);
    }
)

authFetch.interceptors.response.use(
    (response)=>{
        // console.log('response got')
        // console.log(response)
        return response;
    },
    (error)=>{
        return Promise.reject(error);
    }
)


export default authFetch;