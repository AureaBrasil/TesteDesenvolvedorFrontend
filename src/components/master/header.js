import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

//icons
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// redux
import { getProductsCart } from '../../actions/getAction';
import { connect } from 'react-redux';

function LayoutHeader(props) {

    useEffect(() => {
        getProductsCart();
    }, []);

    // conta a quantidade de produtos e valor total
    let countTotalProducts = 0;
    let amountTotalCart = 0;
    props.cartProps.productsCart.forEach(item => {
        countTotalProducts += item.quantityInCart;
        amountTotalCart += item.price * item.quantityInCart;
    });

    let amountTotalCartBrl = 'R$ ' + amountTotalCart.toFixed(2).toString().replace('.', ',')

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Container>
                    <div className="header">
                        <Link to="/" className="header__logo">
                            <h1>Loja da Aurea</h1>
                        </Link>
                        <div className="header__cart">
                            <span className="products-count">{countTotalProducts}</span>
                            <Link to="/cart">
                                <div className="header__cart__text">Meu Carrinho<div className="total-value">{amountTotalCartBrl}</div></div> <ShoppingCartIcon></ShoppingCartIcon>
                            </Link>
                        </div>
                        </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
}


const mapStateToProps = state => ({
                cartProps: state.shoppingCartState
})
export default connect(mapStateToProps, { getProductsCart})(LayoutHeader)