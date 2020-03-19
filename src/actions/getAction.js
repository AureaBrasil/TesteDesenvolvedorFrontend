import {GET_PRODUCTS_CART} from './types';

export const getProductsCart = () => {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCTS_CART
        });
    }
}
