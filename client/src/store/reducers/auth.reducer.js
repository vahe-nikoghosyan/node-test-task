import {GET_ALL_PRODUCTS, GET_ERRORS, SET_CURRENT_USER, SET_INIT_STATE, SET_USER_PRODUCTS, SET_PRODUCT } from "../types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    errors: null,
    products: null,
    my_products: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case SET_USER_PRODUCTS:
            return {
                ...state,
                my_products: action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                my_products: [
                    ...state.my_products, action.payload
                ]
            }
        case SET_INIT_STATE:
            return initialState
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}
