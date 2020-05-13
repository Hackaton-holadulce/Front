import React, { Fragment, useContext } from 'react';
import moment from 'moment'
import { MyContext } from '../context/MyProvider';
import './Stock.css';

const Stock = () => {

     const { products } = useContext(MyContext)

     return (
          <Fragment >
               <div className="container-stock">
                    <div className="articles">
                         <article id="caducidad" className="panel is-danger">
                              <p className="panel-heading">
                                   Van a caducar
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
                                        {products.filter(({ daysToExpire }) => daysToExpire <= 30)
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
                                        {products.filter(({ kg }) => kg <= 1)
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
                                        {products.filter(({ daysToExpire, kg }) => daysToExpire > 30 && kg > 1)
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
                    </div>
               </div>
          </Fragment>
     )
};

export default Stock;
