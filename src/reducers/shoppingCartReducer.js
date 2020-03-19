import {
    ADD_PRODUCT_CART,
    GET_PRODUCTS_CART,
    REMOVE_PRODUCT_CART
} from "../actions/types";

let initialState = {
    productsCart: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_CART:
            //console.log('ADD_PRODUCT_CART', action.payload)
            //verifica se o item já existe na lista de produtos do carrinho
            if (state.productsCart.find(item => item.id === action.payload.id)) {
                // se o produto já existe na lista, altera a quantidade e diminui estoque
                if (state.productsCart.find(item => item.id === action.payload.id).availableQuantity > 0) {
                    state.productsCart.find(item => item.id === action.payload.id).availableQuantity -= 1;
                    state.productsCart.find(item => item.id === action.payload.id).quantityInCart += 1;
                }
            } else {
                // se o produto nao exist na lista, define como 1 e diminui estoque
                action.payload.availableQuantity--;
                action.payload.quantityInCart = 1;
                state.productsCart.push(action.payload);
            }

            return {
                ...state
            }
        case GET_PRODUCTS_CART:
            return {
                ...state
            }
        
        case REMOVE_PRODUCT_CART:
            console.log('REMOVE_PRODUCT_CART', action.payload)
            // diminui a quantidade do produto no carrinho e aumenta em 1 a quantidade disponivel
            state.productsCart.find(item => item.id === action.payload.id).availableQuantity += 1;
            state.productsCart.find(item => item.id === action.payload.id).quantityInCart -= 1;


            // se a quantidade for igual 0, remove o item do array de produtos do carrinho
            if (state.productsCart.find(item => item.id === action.payload.id).quantityInCart === 0) {
                const indexToRemove = state.productsCart.findIndex(item => item.id === action.payload.id);
                state.productsCart.splice(indexToRemove, 1);
            }

            return {
                ...state
            }
        default:
            return state;
    }
}
