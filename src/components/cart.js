import React, { useEffect } from 'react'

// redux
import { getProductsCart } from '../actions/getAction';
import { removeProductCart } from '../actions/removeAction';
import { addProductCart } from '../actions/addAction';
import { connect } from 'react-redux';

// importacoes do material ui
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
function Cart(props) {

    let carrinhoItens = props.cartProps.productsCart;
    useEffect(() => {
        getProductsCart()
    }, []);

    return (
        <div>
            {carrinhoItens.length > 0 ?
                <Grid className="cart" container spacing={3} direction="row" justify="center" alignItems="center">

                    <Grid item md={12} xs={12}>
                        <h1>Resumo do Carrinho</h1>
                    </Grid>

                    {carrinhoItens.map(function (itemCarrinho, index) {

                        return <Grid container key={index} className="cart__product" item md={12} xs={12}>
                            <Grid item md={2} lg={2} xs={12}>
                                <div className="cart__product__picture" style={{ backgroundImage: `url(/assets/products-image/${itemCarrinho.image})` }}></div>
                            </Grid>
                            <Grid item md={5} xs={12} className="cart__product__name">
                                <p>{itemCarrinho.title}</p>
                            </Grid>
                            <Grid item md={1} xs={3}>
                                <button className="cart__product__btn-quantidade" variant="outlined" onClick={() => { props.removeProductCart(itemCarrinho) }}><RemoveIcon /></button>
                            </Grid>
                            <Grid item md={1} xs={6}>
                                <div className="quantidade-label"> {itemCarrinho.quantityInCart}</div>
                            </Grid>
                            <Grid item md={1} xs={3}>
                                <button className="cart__product__btn-quantidade" variant="outlined" onClick={() => { props.addProductCart(itemCarrinho) }}><AddIcon /></button>
                            </Grid>
                            <Grid item md={2} xs={12} className="cart__product__price">
                                <p>{formatPrice(itemCarrinho.price * itemCarrinho.quantityInCart)}</p>
                            </Grid>
                        </Grid>
                    })}
                    <Grid item direction="row" container md={12} xs={12}>
                        <p className="cart-resume">Valor total {getTotalAmount(carrinhoItens)}</p>
                    </Grid>
                </Grid>
                : <div className="nenhum-item">
                    <p>Nenhum item foi adicionado no carrinho</p>
                </div>
            }
        </div>
    )
}


function getTotalAmount(products) {
    let totalAmoutValue = 0;
    products.forEach(itemProduct => {
        totalAmoutValue += itemProduct.price * itemProduct.quantityInCart;
    });
    return formatPrice(totalAmoutValue);
}

function formatPrice(price) {
    return 'R$ ' + price.toFixed(2).toString().replace('.', ',');
}

const mapStateToProps = state => ({
    cartProps: state.shoppingCartState
})
export default connect(mapStateToProps, { getProductsCart, removeProductCart, addProductCart })(Cart)
