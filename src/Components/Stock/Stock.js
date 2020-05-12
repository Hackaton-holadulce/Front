import React, { Fragment, useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/MyProvider';
import './Stock.css';

//backend route --> context

const Stock = () => {

     const { putStockInContext, products } = useContext(MyContext);
     const { state } = useContext(MyContext)
     console.log('productos', state.products)

     useEffect(() => {
          async function fetchMyAPI () {
               let response = await fetch(`http://localhost:5000/stock_ingredients`)
               response = await response.json()
               console.log('response', response)
               putStockInContext(response)
          }
          fetchMyAPI()
     }, [])

     // const [dateOne, setDateOne] = useState('')
     // const [dateTwo, setDateTwo] = useState('')

     const convert = (e) =>{
          var date = new Date(e),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
          console.log('mes de la fecha que le pasamos', mnth)
          // setDateOne([day, mnth, date.getFullYear()].join("/"))
          return [day, mnth, date.getFullYear()].join("/");
     }
     console.log('concrete date converted from yyyy-mm-dd to dd/mm/yyyy', convert('2020-12-19T23:00:00.000Z'))

     const getTodaysDate = () =>{
          var date = new Date(),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
          console.log('mes actual', mnth)
          // setDateTwo([day, mnth, date.getFullYear()].join("/"))
          return [day, mnth, date.getFullYear()].join("/");
     }
     console.log('todays date', getTodaysDate())


     // // new Date("dateString") is browser-dependent and discouraged, so we'll write
     // // a simple parse function for U.S. date format (which does no error checking)
     // function parseDate(str) {
     //      var mdy = str.split('/');
     //      return new Date(mdy[2], mdy[0]-1, mdy[1]);
     // }

     // function datediff(dateOne, dateTwo) {
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

                         <div className={product.kg <= 1 ? "empty" : "full"}  key={index}>
                              {product.name}
                              {` - `}
                              {convert(product.expiration_date)}
                              {` - `}
                              {product.kg}
                         </div>
                    ))}
               </div>
          </Fragment>
     )
};

export default Stock;

