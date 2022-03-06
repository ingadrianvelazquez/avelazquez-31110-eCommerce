import { useContext } from 'react';
import './Cart.css';
import carrito from '../../img/carrito.png';
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
    const { cartInfo, getQuantity } = useContext(CartContext);

    return <Link to="/cart">
        <img src={carrito} title="Carrito" alt="Carrito" width="48" />
        {cartInfo.length > 0 && <span>{getQuantity()}</span>}
    </Link>;
};

export default CartWidget;
