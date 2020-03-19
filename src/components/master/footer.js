import React from 'react';

class LayoutFooter extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return <footer>
            <p>Teste de Front End para <strong>GS Ciência do Consumo</strong> </p>
            <p>Feito por Aurea Brasil utilizando React e Material UI</p>
        </footer>;
    }
}

export default LayoutFooter;