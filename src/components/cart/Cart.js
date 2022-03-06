import './Cart.css';
import { useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartEmpty from './CartEmpty';
import CartDetail from './CartDetail';

const Cart = () => {
    const { cartInfo, addItem, getTotalAmount } = useContext(CartContext);

    useEffect(() => {
        getTotalAmount();
    }, [cartInfo])


    const onChange = (product, units) => {
        addItem(product, units);
        getTotalAmount();
    }

    return <div className="detalleCarrito">
        <h1>CARRITO</h1>
        {cartInfo.length === 0 ?
            <CartEmpty />
            : <CartDetail onChangeFn={onChange} />}
    </div>
};

export default Cart;
