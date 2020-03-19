import React from 'react';
import { withRouter } from "react-router";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import StarRateIcon from '@material-ui/icons/StarRate';

// importacoes do redux
import { connect } from 'react-redux';
import { addProductCart } from '../../actions/addAction';
import { getProductsCart } from '../../actions/getAction';
import { compose } from 'redux'

class ProductDetail extends React.Component {


    state = {
        idProduct: 0,
        productDetailObject: this.null,
        isError: false,
        loadingRequest: true,
        errorDescription: '',
        cartProducts: [],
        availableQuantity: 0
    }
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        this.state.idProduct = this.props.match.params.id;
        let productDetailsRequest = await fetch(`http://localhost:3000/produtos/${this.state.idProduct}`).then().catch(err => {
            this.state.isError = true;
            this.errorDescription = 'Não foi possivel conectar na API, verificar se está executando o servidor local.'
        });
        this.state.productDetailObject = await productDetailsRequest.json().catch(errorJson => {
            this.state.isError = true;
            this.errorDescription = 'Erro ao tentar converter o json com a lista de produtos.'
        });

        this.state.availableQuantity = this.state.productDetailObject.availableQuantity;
        this.setState({ loadingRequest: false });

        // verifica se o produto já existe no carrinho e a quantidade disponivel atualizada
        const idProduct = parseInt(this.state.idProduct)
        let sameProductInCart = this.props.cartProps.productsCart.find(item => item.id === idProduct);
        if (sameProductInCart != undefined) {
            this.state.availableQuantity = sameProductInCart.availableQuantity;
            this.forceUpdate(); // forca o update da pagina para mostrar a quantidade atualizada
        }
    }

    render() {

        if (!this.state.loadingRequest && !this.state.isError) {
            return this.renderDetailProductPage()
        }

        else if (this.state.loadingRequest && !this.state.isError) {
            return 'Carregando... '
        } else if (this.state.isError) {
            return this.errorDescription;
        }
    }

    renderDetailProductPage() {

        const ProductDetailHtml = <Grid alignItems="alignItems" className='product-details' container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item md={5} xs={12}>
                <div className="product-details__picture" style={{ backgroundImage: `url(/assets/products-image/${this.state.productDetailObject.image})` }}></div>

            </Grid>
            <Grid item md={7} xs={12} className="col-info">
                <h1 className="product-details__title"> {this.state.productDetailObject.title}</h1>
                <div className="product-details__details">Um produto de exemplo para a loja do teste de desenvolvedor front-end para GS.</div>
                <div className='product-details__rating'>
                    <StarRateIcon></StarRateIcon>
                    <StarRateIcon></StarRateIcon>
                    <StarRateIcon></StarRateIcon>
                    <StarRateIcon></StarRateIcon>
                    <StarRateIcon></StarRateIcon>
                </div>
                {this.state.availableQuantity > 0
                    ? <div className="product-details__quantity"> {this.state.availableQuantity} peças em estoque</div>
                    : <div className="product-details__quantity"> Esgotado, sem estoque no momento</div>}
                <div className="product-details__price">{this.formatPrice(this.state.productDetailObject.price)}</div>

                {this.state.availableQuantity > 0
                    ? <Button variant="contained" color="primary" className="default" onClick={() => this.addProduct(this.state.productDetailObject)}>Adicionar no carrinho </Button>
                    : <Button variant="contained" disabled>Esgotado!</Button>}
            </Grid>
        </Grid>

        return ProductDetailHtml;
    }

    formatPrice(price) {
        return 'R$ ' + price.toFixed(2).toString().replace('.', ',');
    }

    addProduct(product) {
        this.props.addProductCart(product);
        this.forceUpdate();

        // obtem a quantidade total disponivel atualizada do carrinho
        this.state.availableQuantity = this.props.cartProps.productsCart.find(item => item.id === product.id).availableQuantity;

    }

}
const mapStateToProps = state => ({
    cartProps: state.shoppingCartState
})
export default compose(
    withRouter,
    connect(mapStateToProps, { addProductCart, getProductsCart })
)(ProductDetail);
