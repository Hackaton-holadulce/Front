import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        products: [],
    }

    render() {

        const { products } = this.state;


        const { children } = this.props;

        return (
            <MyContext.Provider value={{
                state: this.state,
                putStockInContext: (data) => this.setState({
                    products: data,
                }),
                products,

            }}
            >
            {/* <Link to="">Volver al dashboard</Link> */}
                {children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
