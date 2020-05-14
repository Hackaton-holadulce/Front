import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Navbar.css';
import logoHola from '../Home/logoHolaDulce.png'

class Navbar extends React.Component {
    render() {
        return(
            <div>
                <nav>
                   {/* <a href="https://anhatdev.netlify.app/" target="_blank" class="logo">
                    <img src="https://instagram.fsgn2-3.fna.fbcdn.net/v/t51.2885-19/s150x150/93232666_2464704140507495_3712663940770037760_n.jpg?_nc_ht=instagram.fsgn2-3.fna.fbcdn.net&_nc_ohc=d9hovHGfAV0AX8H5HXR&oh=3374cf8b4c4dadeb5c52778d8f947bcb&oe=5EC47ECA" alt="logo"/>
                    </a>*/}
                    <ul className="navbar">
                    <li className="navbar-item">
                        <Link to="">Dashboard</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="stock">Producto</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="box">Crear Receta</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="form-stock">Añadir Producto</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="sale">Boxes</Link>
                    </li>
                    </ul>
                    <div>
                      <img alt="logoHola" className="logoHola" src={logoHola} />
                    </div>
                </nav>
            </div>
        )
    }
}


export default Navbar
