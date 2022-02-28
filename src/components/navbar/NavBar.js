import './NavBar.css';
import CartWidget from '../cart/CartWidget';
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return <nav>
        <div className="unquinto logo">
            <Link to="/">
                Z-Store
            </Link>
        </div >

        <ul className="tresquintos">
            <li>
                <NavLink to="/category/movies" className={({ isActive }) => (isActive ? 'current' : '')}>Películas</NavLink>
            </li>
            <li>
                <NavLink to="/category/series" className={({ isActive }) => (isActive ? 'current' : '')}>Series</NavLink>
            </li>
            <li>
                <NavLink to="/category/games" className={({ isActive }) => (isActive ? 'current' : '')}>Juegos</NavLink>
            </li>
            <li className="checkOrder">
                <NavLink to="/checkorder" className={({ isActive }) => (isActive ? 'current' : '')}>Ver Orden</NavLink>
            </li>
        </ul>

        <div className="unquinto carrito">
            <CartWidget />
        </div>

        <div className="clear"></div>

    </nav>;
};

export default NavBar;