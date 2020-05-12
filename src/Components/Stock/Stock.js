import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/MyProvider';

//backend route --> context

const Stock = () => {

     const { putStockInContext } = useContext(MyContext);
console.log(putStockInContext)
//      useEffect(() => {
//           fetch('https://api.chucknorris.io/jokes/random')
//             .then(res => res.json())
//             .then(data => console.log(data) )
// // console.log (data)
//      }, [])

     const [data, dataSet] = useState('')

     

     useEffect(() => {
          async function fetchMyAPI () {
               let response = await fetch(`https://api.chucknorris.io/jokes/random`)
               response = await response.json()
               dataSet(response)
          }
          fetchMyAPI()
     }, [])

     
     const postInfo = (data) => {
          putStockInContext(data)
     }


     return (
          <div className="App">
               <Link to="">Home</Link>
               <Link to="stock">Stock</Link>
               <Link to="box">Box</Link> 

          <h1>Stock</h1>
          
               <button type="button" onClick={() => { postInfo(data) }}></button>
          </div>
     )
};

export default Stock;