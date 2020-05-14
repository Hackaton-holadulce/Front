import React, { Fragment, useContext, useEffect, useState } from 'react';
import moment from 'moment'
import { MyContext } from '../context/MyProvider';
import './Stock.css';
const Stock = () => {
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
     const [input, setInput] = useState('')
     const filteredProducts = products.filter(({ name }) => {
          let regexToUse = new RegExp(input, 'i');
          return (regexToUse).test(name);
     })
     return (
          <Fragment >
               <div className="container-stock">
                    <div className="articles">
                         <input className="input" style={{marginBottom: 20}} value={input} placeholder="Escribe para buscar productos" type="text" onChange={(e) => { setInput(e.target.value) }}/>
                         <article id="caducidad" className="panel is-danger">
                              <p className="panel-heading">
                                   Va a caducar
                              </p>
                              <p className="panel-tabs">
                                   <a className="is-active">Van a caducar</a>
                                   <a href="#cantidad">Queda poco</a>
                                   <a href="#correcto">Todo bien</a>
                              </p>
                              {/* <div className="panel-block">
                                   <p className="control has-icons-left">
                                        <input className="input is-primary" type="text" placeholder="Search" />
                                        <span className="icon is-left">
                                             <i className="fas fa-search" aria-hidden="true"></i>
                                        </span>
                                   </p>
                              </div> */}
                              <table class="table is-fullwidth">
                                   <thead>
                                        <tr>
                                             <th>Nombre</th>
                                             <th>Fecha de caducidad</th>
                                             <th>Días hasta que caduque</th>
                                             <th>Cantidad</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {filteredProducts.filter(({ daysToExpire }) => daysToExpire <= 30)
                                             .map((product, index) => (
                                                  <tr key={index}>
                                                       <td>{product.name}</td>
                                                       <td>{moment(product.expiration_date).format('L')}</td>
                                                       <td>{product.daysToExpire}</td>
                                                       <td>{product.kg}</td>
                                                  </tr>
                                             ))}
                                        {filteredProducts.filter(({ daysToExpire }) => daysToExpire <= 30).length === 0 &&
                                             <tr>
                                                  <td>-</td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                             </tr>
                                        }
                                   </tbody>
                              </table>
                         </article>
                         <article  id="cantidad" className="panel is-warning">
                              <p className="panel-heading">
                                   Queda poco
                              </p>
                              <p className="panel-tabs">
                                   <a href="#caducidad">Van a caducar</a>
                                   <a className="is-active">Queda poco</a>
                                   <a href="#correcto">Todo bien</a>
                              </p>
                              {/* <div className="panel-block">
                                   <p className="control has-icons-left">
                                        <input className="input is-primary" type="text" placeholder="Search" />
                                        <span className="icon is-left">
                                             <i className="fas fa-search" aria-hidden="true"></i>
                                        </span>
                                   </p>
                              </div> */}
                              <table class="table is-fullwidth">
                                   <thead>
                                        <tr>
                                             <th>Nombre</th>
                                             <th>Fecha de caducidad</th>
                                             <th>Días hasta que caduque</th>
                                             <th>Cantidad</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {filteredProducts.filter(({ kg }) => kg <= 1)
                                             .map((product, index) => (
                                                  <tr key={index}>
                                                       <td>{product.name}</td>
                                                       <td>{moment(product.expiration_date).format('L')}</td>
                                                       <td>{product.daysToExpire}</td>
                                                       <td>{product.kg}</td>
                                                  </tr>
                                             ))}
                                   </tbody>
                              </table>
                         </article>
                         <article id="correcto" className="panel is-primary">
                              <p className="panel-heading">
                                   Todo bien
                              </p>
                              <p className="panel-tabs">
                                   <a href="#caducidad">Van a caducar</a>
                                   <a href="#cantidad">Queda poco</a>
                                   <a className="is-active">Todo bien</a>
                              </p>
                              {/* <div className="panel-block">
                                   <p className="control has-icons-left">
                                        <input className="input is-primary" type="text" placeholder="Search" />
                                        <span className="icon is-left">
                                             <i className="fas fa-search" aria-hidden="true"></i>
                                        </span>
                                   </p>
                              </div> */}
                              <table class="table is-fullwidth">
                                   <thead>
                                        <tr>
                                             <th>Nombre</th>
                                             <th>Fecha de caducidad</th>
                                             <th>Días hasta que caduque</th>
                                             <th>Cantidad</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                       {/*</table> {filteredProducts.filter(({ daysToExpire, kg }) => daysToExpire > 30 && kg > 1)*/}
                                   {products.filter(({ daysToExpire, kg }) => daysToExpire > 30 && kg > 1)
                                             .map((product, index) => (
                                                  <tr key={index}>
                                                       <td>{product.name}</td>
                                                       <td>{product.expiration_date === "2030-12-29T23:00:00.000Z"
                                                       ? "No caduca"
                                                       : moment(product.expiration_date).format('L') }</td>
                                                       <td>{product.expiration_date === "2030-12-29T23:00:00.000Z"
                                                       ? "-"
                                                       : product.daysToExpire}</td>
                                                       <td>{product.kg}</td>
                                                  </tr>
                                             ))}
                                   </tbody>
                              </table>
                         </article>
                    </div>
               </div>
          </Fragment>
     )
};
export default Stock;