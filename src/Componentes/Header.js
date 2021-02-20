import react, { Component } from 'react';
import logo from '../assets/imagenes/logo.svg';


class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    {/*logo*/}
                    <div id="logo">
                        <img src={logo} classNameName="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>RegulonDB</strong>
                        </span>
                    </div>

                    {/*Menu*/}
                    <nav id="menu">
                        <ul>
                            <li>
                                <a href="./index.html">Inicio</a>
                            </li>
                            <li>
                                <a href="./blog.html">Blog</a>
                            </li>
                            <li>
                                <a href="./article.html">Articulo</a>
                            </li>
                            <li>
                                <a href="./formulario.html">Formulario</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;