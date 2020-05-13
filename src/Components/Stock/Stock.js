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

     // const [dateOne, setDateOne] = useState('')
     // const [dateTwo, setDateTwo] = useState('')

     // const convert = (e) =>{

     //      console.log('date', e)

     //      console.log('parsed', moment(e))

     //      return moment(`${e}`)
     //      // var date = new Date(e),
     //      // mnth = ("0" + (date.getMonth() + 1)).slice(-2),
     //      // day = ("0" + date.getDate()).slice(-2);
     //      // console.log('mes de la fecha que le pasamos', mnth)
     //      // setDateOne([day, mnth, date.getFullYear()].join("/"))
     //      // return [day, mnth, date.getFullYear()].join("/");
     // }
     // console.log('concrete date converted from yyyy-mm-dd to dd/mm/yyyy', convert('2020-12-19T23:00:00.000Z'))

     // const getTodaysDate = () =>{
     //      var date = new Date(),
     //      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
     //      day = ("0" + date.getDate()).slice(-2);
     //      console.log('mes actual', mnth)
     //      setDateTwo([day, mnth, date.getFullYear()].join("/"))
     //      return [day, mnth, date.getFullYear()].join("/");
     // }
     // console.log('todays date', getTodaysDate())

     // new Date("dateString") is browser-dependent and discouraged, so we'll write
     // a simple parse function for U.S. date format (which does no error checking)
     // const parseDate = (str) => {
     //      const mdy = str.split('/');
     //      return new Date(mdy[2], mdy[0]-1, mdy[1]);
     // }

     // const datediff = (dateOne, dateTwo) => {
     //      // Take the difference between the dates and divide by milliseconds per day.
     //      // Round to nearest whole number to deal with DST.
     //      return Math.round((dateTwo-dateOne)/(1000*60*60*24));
     // }

     // alert(datediff(parseDate(dateOne), parseDate(dateTwo)));

     return (
          <Fragment>
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
          </Fragment>
     )
};

export default Stock;

