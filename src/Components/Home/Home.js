import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyProvider';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Home.css';


const Home = () => {

    const { putStockInContext, products } = useContext(MyContext);

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
                    <div className="home-play-buttons">
                     <Link to="stock"> 
                        <button className="dash_button" type="button">
                            Productos
                        </button>
                     </Link>
                     <Link to="form-stock">
                        <button  className="dash_button" type="button" >
                            Añadir Productos
                        </button>
                     </Link>
                    <Link to="sale">
                        <button className="dash_button" type="button" >
                            Boxes
                        </button>
                    </Link>
                    <Link to="box">
                        <button  className="dash_button" type="button" >
                            Crear Boxes
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
}


export default Home;




