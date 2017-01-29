import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGOUT

} from './ActionTypes';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
/*============================================================================
 authentication
 ==============================================================================*/

/* LOGIN */
export function loginRequest(email, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/auth/login', {email, password})
            .then((response) => {
                // SUCCEED
                console.log("login SUCCEED");
                console.log(response.data.info.name);
                dispatch(loginSuccess(response.data.info.name));
                // dispatch(loginSuccess());
                //Auth.authenticateUser(response.data.token);
            }).catch((error) => {
                // FAILED
                console.log("login Error");
                dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}
/*
 export function loginSuccess() {
 return {
 type: AUTH_LOGIN_SUCCESS
 };
 }
 */
export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS
        , username
    };
}


export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(name, email, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/auth/signup', {name, email, password})
            .then((response) => {
                dispatch(registerSuccess());
                console.log('The form is valid');
            }).catch((error) => {
                // FAILED
                const errorMessage = error.response.data.message;
                const errorEmail = error.response.data.errors.email;
                const errorPassword = error.response.data.errors.password;
                const errorName = error.response.data.errors.name;

                dispatch(registerFailure(errorMessage, errorName, errorEmail, errorPassword));
            });
    };

}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(errorMessage, errorName, errorEmail, errorPassword) {
    return {
        type: AUTH_REGISTER_FAILURE,
        errorMessage,
        errorEmail,
        errorPassword,
        errorName
    };
}

/* Logout */

export function logoutRequest() {
    return (dispatch) => {
        return axios.get('/auth/logout')
            .then((response) => {
                dispatch(logout());
            });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
