import './Cart.css';
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom'
import ProductoCarrito from '../producto/ProductoCarrito';

const Cart = () => {
    const { cartInfo, addItem, clear } = useContext(CartContext);

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setTotalAmount(getTotalAmount());
    }, [cartInfo])

    const getTotalAmount = () => {
        let aux = 0;
        if (cartInfo.length !== 0) {
            cartInfo.map((product) => {
                aux += (product.price * product.quantity);
            })
        }
        return aux;
    }

    const clearCart = () => {
        clear();
    }

    const onChange = (product, units) => {
        addItem(product, units);
        setTotalAmount(getTotalAmount());
    }

    const finished = () => {
        alert('Pendiente!');
    }

    return <div className="detalleCarrito">
        <h1>CARRITO</h1>
        <div>
            <div className="productos">
                {cartInfo.map((product) =>
                    <ProductoCarrito key={product.id} product={product} onChangeFn={onChange} />
                )}
                <div className="clear"></div>
                <div className="totalCarrito">
                    {totalAmount > 0 && <p>Total: AR$ {totalAmount}</p>}
                </div>
            </div>
            {cartInfo.length === 0 ?
                <div>
                    <p>
                        <span>Aún no se han agregado productos.</span>
                    </p>
                    <Link to={'/home'} className="verProductos">Ver Productos</Link>
                </div> :
                <div>
                    <button className="limpiarCarrito" onClick={clearCart}>Vaciar Carrito</button>
                    <button className="terminarCompra" onClick={finished}>Terminar mi Compra</button>
                </div>}
        </div>
    </div>
};

export default Cart;
