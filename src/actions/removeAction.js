import {REMOVE_PRODUCT_CART} from './types';

export const removeProductCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_PRODUCT_CART,
            payload: product
        });
    }
}