import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductSingle from './product.single';

class ProductList extends React.Component {

    productsResponse = [];

    state = {
        isError: false,
        loadingRequestProducts: true,
    }
    constructor(props) {
        super(props);
    }
    async componentDidMount() {

        try {
            // faz o request para obter a lista de produtos
            let testeProdutos = await fetch('http://localhost:3000/produtos').then().catch(err => {
                this.state.isError = true;
            });

            this.productsResponse = await testeProdutos.json().catch(errorJson => {
                this.state.isError = true;
            });
            this.setState({ loadingRequestProducts: false });
        } catch(err){
            this.setState({ isError: true });
            this.setState({ loadingRequestProducts: false });
        }
    }

    render() {
        // se já completou a requisicao e nao existe erro
        if(!this.state.loadingRequestProducts && !this.state.isError) {
            return this.renderListProduct(this.productsResponse)
        } 
        
        else if(this.state.loadingRequestProducts && !this.state.isError) {
            return 'Carregando... '
        } else if (this.state.isError) {
            return <div>Não foi possivel conectar com a API com a lista de produtos, por favor verifique se o json-server está executando na porta 3000. Ou execute o comando <br></br><textarea>json-server --watch rest-api/products.json</textarea></div>
        }
    }

    // renderiza a lista de produtos
    renderListProduct(productList) {

        const ProductsGrid = <div className="lista-produtos">
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                
                <Grid item md={12}>
                    <h1 className='titulo-lista-produtos'>Produtos em destaque</h1>
                </Grid>
                
                {productList.map(function (productDetails, index) {
                    return <Grid key={index.toString()} item xs={12} md={4} xl={4}>
                        <ProductSingle productData={productDetails}></ProductSingle>
                    </Grid>
                })}
            </Grid>
        </div>

        return ProductsGrid;
    }
}

export default ProductList;