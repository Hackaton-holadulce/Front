import React, { Fragment, useState, useContext, useEffect } from 'react';
import moment from 'moment'
import { MyContext } from '../context/MyProvider';
import './Stock.css';

//backend route --> context

const Stock = () => {

     const { putStockInContext, products } = useContext(MyContext);
     const { state } = useContext(MyContext)
     console.log('productos', state.products)

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
          <Fragment >
               <div className="container-stock">
                    <div>
                         <h1>Stock</h1>
                    </div>
                    <div className="alerts">
                         Alerts here
                         {/* We would here filter the ingredients that have < 1 Kg */}
                    </div>

                    <div className="stock-container">
                         {products.map((product, index) => (

                              <div className={product.kg <= 1 || product.daysToExpire <= 30  ? "empty" : "full"}  key={index}>
                                   {product.name}
                                   {` || `}
                                   {moment(product.expiration_date).format('L')}
                                   {` || `}
                                   {product.daysToExpire}
                                   {` || `}
                                   {product.kg}
                              </div>
                         ))}
                    </div>
               </div>
          </Fragment>
     )
};

export default Stock;

