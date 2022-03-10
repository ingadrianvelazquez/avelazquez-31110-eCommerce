import './NavBar.css';
import CartWidget from '../cart/CartWidget';
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import LoginWidget from '../login/LoginWidget';

const NavBar = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const aux = [];
        const db = getFirestore();
        getDocs(collection(db, 'categories')).then((cats) => {
            cats.docs.forEach(async (cat) => {
                aux.push(cat.data())
            })
        }).finally(() => {
            setCategories(aux);
            setLoading(false);
        });
    }, [])

    return <nav>
        <div className="unquinto logo">
            <Link to="/">
                Z-Store
            </Link>
        </div >

        <ul className="tresquintos">
            {loading ?
                <span>Cargando categorias...</span>
                :
                categories.map((cat) => {
                    let catLink = '/category/' + cat.categoryLabel;
                    return <li key={cat.categoryLabel}>
                        <NavLink to={catLink} className={({ isActive }) => (isActive ? 'current' : '')}>{cat.categoryName}</NavLink>
                    </li>
                })
            }
            <li className="checkOrder">
                <NavLink to="/checkorder" className={({ isActive }) => (isActive ? 'current' : '')}>Ver Orden</NavLink>
            </li>
        </ul>

        <div className="unquinto carrito">
            <LoginWidget />
            <CartWidget />
        </div>

        <div className="clear"></div>

    </nav>;
};

export default NavBar;