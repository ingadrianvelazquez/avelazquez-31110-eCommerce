import './Cart.css';
import { useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom'
import ProductoCarrito from '../producto/ProductoCarrito';

const Cart = () => {
    const { cartInfo, totalAmount, addItem, clear, setTotalAmount } = useContext(CartContext);

    useEffect(() => {
        setTotalAmount(getTotalAmount());
    }, [cartInfo])

    const getTotalAmount = () => {
        let aux = 0;
        if (cartInfo.length !== 0) {
            cartInfo.forEach((product) => {
                aux += (product.price * product.quantity);
            })
        }
        return aux;
    }

    const onChange = (product, units) => {
        addItem(product, units);
        setTotalAmount(getTotalAmount());
    }

    return <div className="detalleCarrito">
        <h1>CARRITO</h1>
        <div>
            <div className="productos">
                <div className="items">
                    {cartInfo.map((product) =>
                        <ProductoCarrito key={product.id} product={product} onChangeFn={onChange} />
                    )}
                    <div className="clear"></div>
                </div>
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
                    <button className="limpiarCarrito" onClick={clear}>Vaciar Carrito</button>
                    <Link to={'/checkout'} className="terminarCompra">Terminar mi Compra</Link>
                </div>}
        </div>
    </div>
};

export default Cart;
