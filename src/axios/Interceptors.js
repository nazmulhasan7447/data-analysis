import axios from 'axios';

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

export const BASE_URL = 'https://orca-app-4n9ni.ondigitalocean.app'
export const REDIRECT_URL = 'http://localhost:3000'
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