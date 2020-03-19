import React, { useEffect } from 'react';
import './styles/css/app.css?1232';
import Home from './components/home';
import Cart from './components/cart';
import ProductDetail from './components/product/product.details';
import LayoutHeader from './components/master/header'
import LayoutFooter from './components/master/footer'
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { getProductsCart } from './actions/getAction'

import { connect } from 'react-redux';


function App(props) {

    useEffect(() => {
        getProductsCart();
    }, []);
    return (
        <React.Fragment>
            <Router>
                <LayoutHeader></LayoutHeader>
                <Container>
                    <div className="content-body">

                        <Switch>
                            <Route path={`/product-details/:id`}>
                                <ProductDetail />
                            </Route>
                            <Route path="/cart" >
                                <Cart></Cart>
                            </Route>
                            <Route path="/" >
                                <Home></Home>
                            </Route>

                        </Switch>
                    </div>
                </Container>
            </Router>
            <LayoutFooter></LayoutFooter>
        </React.Fragment>
    );
}
const mapStateToProps = state => ({
    cartProps: state.basketState
})
export default connect(mapStateToProps, { getProductsCart })(App)
