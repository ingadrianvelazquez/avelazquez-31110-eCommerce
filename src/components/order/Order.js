import './Order.css';
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ProductoCarrito from '../producto/ProductoCarrito';
import loadingZombie from '../../img/loadingZombie.gif';
import { doc, getDoc, getFirestore } from 'firebase/firestore';


const Order = () => {
    const { orderId } = useParams();

    const [loading, setLoading] = useState(true);
    const [searchOrder, setSearchOrder] = useState('');
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (orderId) {
            const db = getFirestore();
            const docRef = doc(db, 'orders', orderId);
            getDoc(docRef).then((orden) => {
                if (orden.exists()) {
                    setOrder(orden.data());
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [orderId])

    if (!orderId) {
        return <div className="detalleCarrito">
            <h2 className="orderID">Por favor, ingrese el código de su Orden</h2>
            <input type="text" name="orderID" value={searchOrder} id="orderID" onChange={(e) => setSearchOrder(e.target.value)} />
            <p>Ejemplo: wx2H8bZNe2hYZojdtEMs</p>
            <Link to={'/checkorder/' + searchOrder} className="viewOrder">Ver Detalle</Link>
        </div>
    }

    if (loading) {
        return <div className="loading">
            <p>cargando...</p>
            <img src={loadingZombie} alt="Loading" title="Loading" />
            <p>cargando...</p>
        </div>
    }

    console.log(order);

    return <div className="detalleCarrito">
        <h1>MI ORDEN</h1>
        <p>Hola <strong>{order.buyer.name}</strong>! Este es el detalle de tu orden:</p>
        <h2 className="orderID">{orderId}</h2>
        <div>
            {order.length !== 0 ?
                <div className="productos">
                    <div className="items">
                        {order.items.map((product) =>
                            <ProductoCarrito key={product.name} product={product} />
                        )}
                        <div className="clear"></div>
                    </div>
                    <div className="totalCarrito">
                        <p>Total: AR$ {order.total}</p>
                    </div>
                </div>
                :
                <div>
                    <p>NO se hallaron datos para la orden ingresada.</p>
                    <Link to={'/home'} className="verProductos">Continuar Navegando</Link>
                </div>}
        </div>
    </div>
};

export default Order;
