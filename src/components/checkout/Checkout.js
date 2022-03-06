import './Checkout.css';
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutEmpty from './CheckoutEmpty';
import CheckoutDetail from './CheckoutDetail';
import CheckoutSuccess from './CheckoutSuccess';

const Cart = () => {
    const { cartInfo } = useContext(CartContext);

    const [orderID, setOrderID] = useState('');
    const [message, setMessage] = useState('');

    const [buyer, setBuyer] = useState(
        {
            name: '',
            phone: '',
            email: '',
            confirm_email: '',
        }
    );

    return <div className="detalleCarrito">
        <h1>{orderID === '' ? 'TERMINAR MI COMPRA' : 'COMPRA EXITOSA!'}</h1>
        <div>
            {cartInfo.length === 0 ?
                orderID !== '' ?
                    <CheckoutSuccess message={message} orderID={orderID} />
                    :
                    <CheckoutEmpty />
                :
                <CheckoutDetail buyer={buyer} setOrderID={setOrderID} setMessage={setMessage} setBuyer={setBuyer} />}
        </div>
    </div>
};

export default Cart;
