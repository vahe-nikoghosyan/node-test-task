import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER, SET_INIT_STATE, GET_ALL_PRODUCTS, SET_USER_PRODUCTS, SET_PRODUCT } from "../types";
// Register User
export const registerUser = (userData, history) => dispatch => {
    console.log(history, 'history')
    axios({
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        url: 'http://localhost:8080/users/register',
        data: {
            full_name: userData.full_name,
            email: userData.email,
            password: userData.password,
        }
    })
        .then(res => {
            dispatch({
              type: SET_INIT_STATE,
              payload: ''
            })
            history.push({
                pathname: "/login",
                state: {
                    isRegisterRedirect: true,
                    isVerify: true
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data?.message
            })
        );
};

// setProduct
export const setProduct = (data) => dispatch => {
    axios({
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        url: 'http://localhost:8080/products',
        data
    })
        .then(res => {
            console.log(res.data, '<<<<<<<<<<<<<<<<<<<')
            dispatch({
              type: SET_PRODUCT,
              payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data?.message
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios({
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        url: 'http://localhost:8080/auth/login',
        data: {
            email: userData.email,
            password: userData.password,
        }
    })
        .then(res => {
            // Set token to localStorage
            const { token, user } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Set current user
            dispatch(setCurrentUser(user));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data?.message
            })
        );
};

// get all products
export const getAllProducts = () => dispatch => {
    axios({
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'GET',
        url: 'http://localhost:8080/products',
    })
        .then(res => {
            console.log(res.data, 'res')
            // Set current user
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: res.data.products
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data?.message
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = (history) => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    history.push('/login');
};

// get user products
export const getUserProducts = (userId) => dispatch => {
    axios({
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'GET',
        url: `http://localhost:8080/users/${userId}`,
    })
        .then(res => {
            // Set token to localStorage
            const { user } = res.data;
            console.log(res.data)
            dispatch({
                type: SET_USER_PRODUCTS,
                payload: res.data.products
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data?.message
            })
        );
};
