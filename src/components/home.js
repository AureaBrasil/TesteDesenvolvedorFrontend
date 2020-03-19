import React from 'react';
import ProductList from './product/product.list';


function Home(props) {

    return (
        <React.Fragment>
            <div className="content-body">
                <ProductList></ProductList>
            </div>
        </React.Fragment>
    );
}
export default Home;
