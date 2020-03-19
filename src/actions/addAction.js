import {ADD_PRODUCT_CART} from './types';

export const addProductCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: ADD_PRODUCT_CART,
            payload: product
        });
    }
}