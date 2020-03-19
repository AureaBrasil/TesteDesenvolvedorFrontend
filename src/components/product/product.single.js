import React from 'react';
import {Link} from "react-router-dom";

// importacoes do redux
import { connect } from 'react-redux';
import { addProductCart } from '../../actions/addAction';
import { getProductsCart } from '../../actions/getAction';

// importacoes do material ui
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import StarRateIcon from '@material-ui/icons/StarRate';

// representa um unico produto da lista
class ProductSingle extends React.Component {

    state = {
        loading: false,
        productDetails: null,
        availableQuantity: this.props.productData.availableQuantity,
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // verifica se o produto já existe no carrinho e a quantidade disponivel atualizada
        let sameProductInCart = this.props.cartProps.productsCart.find(item => item.id === this.props.productData.id);
        if (sameProductInCart != undefined) {
            this.state.availableQuantity = sameProductInCart.availableQuantity;
            this.forceUpdate(); // forca o update da pagina para mostrar a quantidade atualizada
        }
    }

    render() {

        const htmlSingleProduct = <Box><div className='product'>
            <Link to={'/product-details/' + this.props.productData.id}>
                <div className="product__image" style={{ backgroundImage: `url(/assets/products-image/${this.props.productData.image})` }}></div>
                <div className='product__name'>{this.props.productData.title}</div></Link>
            <div className='product__rating'>
                <StarRateIcon></StarRateIcon>
                <StarRateIcon></StarRateIcon>
                <StarRateIcon></StarRateIcon>
                <StarRateIcon></StarRateIcon>
                <StarRateIcon></StarRateIcon>
            </div>
            {this.state.availableQuantity > 0 ? 
                <div className='product__available'> {this.state.availableQuantity}  peças restantes</div> 
                : <div className='product__available'> ESGOTADO!</div> }
            <div className='product__price'>{this.formatPrice(this.props.productData.price)}</div>
            {this.state.availableQuantity > 0 ? 
            <Button variant="contained" color="primary" className="default" onClick={() => this.addProduct(this.props.productData)}>Adicionar no carrinho </Button>
            : <Button  variant="outlined" disabled className="default">Sem estoque :(</Button>}
        </div></Box>;

        return htmlSingleProduct;
    }

    formatPrice(price) {
        return 'R$ ' + price.toFixed(2).toString().replace('.', ',');
    }

    addProduct(product) {
        
        this.props.addProductCart(product);

        // ao clicar em add produto, verifica na propriedade quantidade disponivel no produto do carrinho
        let sameProductInCart = this.props.cartProps.productsCart.find(item => item.id === this.props.productData.id);
        if (sameProductInCart != undefined) {
            this.state.availableQuantity = sameProductInCart.availableQuantity;
            this.forceUpdate(); // forca o update da pagina para mostrar a quantidade atualizada
        }
    }
}

const mapStateToProps = state => ({
    cartProps: state.shoppingCartState
})
export default connect(mapStateToProps, { addProductCart, getProductsCart})(ProductSingle);