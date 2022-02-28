import './Checkout.css';
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom'
import Form from '../checkout/Form';
import { collection, doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';

const Cart = () => {
    const { cartInfo, totalAmount, clear, setTotalAmount } = useContext(CartContext);

    const [orderID, setOrderID] = useState('');
    const [message, setMessage] = useState('');

    const [buyer, setBuyer] = useState(
        {
            name: '',
            phone: '',
            email: '',
        }
    );

    const [validation, setValidation] = useState(
        {
            name: '',
            phone: '',
            email: '',
        }
    );

    const validateBuyer = () => {
        let rtn = true;
        if (buyer.name.length <= 3) {
            rtn = false;
            setValidation({ ...validation, name: 'Por favor, complete su nombre completo.' });
        }
        if (rtn && !/^[0-9]+$/.test(buyer.phone.trim())) {
            rtn = false;
            setValidation({ ...validation, phone: 'Por favor, ingrese solo números en su teléfono.' });
        }
        if (rtn && !/^[a-zA-Z0-9._-]+([+][a-zA-Z0-9._-]+){0,1}[@][a-zA-Z0-9._-]+[.][a-zA-Z]{2,6}$/.test(buyer.email.trim())) {
            rtn = false;
            setValidation({ ...validation, email: 'Por favor, ingrese un correo electrónico válido.' });
        }
        return rtn;
    }

    const sendOrder = async () => {

        if (validateBuyer()) {
            let inStock = true;
            if (cartInfo.length !== 0) {
                const db = getFirestore();
                const batch = writeBatch(db);
                const newOrder = doc(collection(db, 'orders'));
                batch.set(newOrder, { buyer: buyer, items: cartInfo.map(({ id, category, categoryId, description, stock, ...atributosFiltrados }) => atributosFiltrados), date: new Date().toLocaleString(), total: totalAmount })

                await Promise.all(
                    cartInfo.map(async (prod) => {
                        let itemRef = doc(db, 'items', prod.id);
                        const docProd = await getDoc(itemRef);
                        let stockActual = docProd.data().stock;
                        if (stockActual >= prod.quantity) {
                            batch.update(itemRef, { stock: stockActual - prod.quantity });
                        } else {
                            inStock = false;
                        }
                    }));

                if (inStock) {
                    batch.commit();
                    setOrderID(newOrder.id);
                    setMessage('Su orden se ha registrado bajo el código:');
                } else {
                    setMessage('Se presentó un problema de Stock con sus productos.<br>Por favor, verifique los mismos actualizados.');
                }
                setTotalAmount(0);
                clear();
            }
        }
    }

    return <div className="detalleCarrito">
        <h1>{orderID === '' ? 'TERMINAR MI COMPRA' : 'COMPRA EXITOSA!'}</h1>
        <div>
            {cartInfo.length === 0 ?
                orderID !== '' ?
                    <div>
                        <div className="totalCarrito">
                            <p>{message} <br /> {orderID}</p>
                        </div>
                        <Link to={'/home'} className="verProductos">Continuar Navegando</Link>
                    </div>
                    :
                    <div>
                        <p>
                            <span>Aún no se han agregado productos.</span>
                        </p>
                        <Link to={'/home'} className="verProductos">Ver Productos</Link>
                    </div>
                :
                <div>
                    <div className="productos finalizar">
                                    <div className="totalCarrito">
                            {totalAmount > 0 && <p>Total: AR$ {totalAmount}</p>}
                        </div>
                        <Form buyer={buyer} validation={validation} setBuyer={setBuyer} setValidation={setValidation} />
                    </div>
                    <div>
                        <Link to={'/home'} className="seguirComprando">Seguir Comprando</Link>
                        <button className="registrarCompra" onClick={sendOrder}>Registrar mi Orden</button>
                    </div>
                </div>}
        </div>
    </div>
};

export default Cart;
