import { useContext } from 'react';
import './Cart.css';
import carrito from '../../img/carrito.png';
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
    const { cartInfo } = useContext(CartContext);

    const getQty = () => {
        let rtn = 0;
        cartInfo.forEach((product) => {
            rtn += product.quantity;
        })
        return rtn;
    }
    return <Link to="/cart">
        <img src={carrito} title="Carrito" alt="Carrito" width="48" />
        {cartInfo.length > 0 && <span>{getQty()}</span>}
    </Link>;
};

export default CartWidget;
