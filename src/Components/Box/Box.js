import React from 'react';
//import './Home.css';
import { Link } from 'react-router-dom';



const Box = () => (

    <div className="box-container">

        <Link to="">Home</Link>
        <Link to="stock">Stock</Link>
        <Link to="box">Box</Link>

        <h1>Box</h1>



    </div>
);


export default Box;
