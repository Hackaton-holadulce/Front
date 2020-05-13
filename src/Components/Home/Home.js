import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyProvider';
import moment from 'moment'
import './Home.css';



const Home = () => {

    const { putStockInContext, products } = useContext(MyContext);
    const { state } = useContext(MyContext);


    useEffect(() => {
        // const fetchMyAPI = async () => {
        //      let response = await fetch(`http://localhost:5000/stock_ingredients`)
        //      response = await response.json()
        //      console.log('response', response)
        //      putStockInContext(response)
        // }
        fetchMyAPI()
    }, [])

    const fetchMyAPI = async () => {
        let response = await fetch(`http://localhost:5000/stock_ingredients`)
        response = await response.json()
        handleExpiration(response)
        putStockInContext(response)
    }

    const handleExpiration = (products) => {
        products.forEach((product) => {
            const expirationDate = moment(product.expiration_date);
            product.daysToExpire = -1 * Math.ceil(moment.duration(moment().diff(expirationDate)).as('days'))
        })
    }

    return (
        <div className="home-container">
            <div className="main-page">
                <h1>Home</h1>

                {products.filter(({ daysToExpire }) => daysToExpire <= 30)
                    .map((product, index) => (
                        <ul key={index}>
                            <li>{product.name}</li>
                            <li>{moment(product.expiration_date).format('L')}</li>
                            <li>{product.daysToExpire}</li>
                            <li>{product.kg}</li>
                        </ul>
                    ))}

            </div>
        </div>
    );
}


export default Home;




