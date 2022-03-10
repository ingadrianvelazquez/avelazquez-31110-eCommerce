import './Orders.css';
import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Loading from '../loading/Loading';
import { CartContext } from '../../context/CartContext';
import Listado from './Listado';

const Orders = () => {
    const { buyerInfo } = useContext(CartContext);

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const addToOrders = async (query) => {
            const aux = [];
            const result = await getDocs(query);
            result.docs.map(async (item) => {
                let order = item.data();
                order.id = item.id;
                aux.push(order);
                //setOrders([...orders, order]);
            })
            setOrders(aux);
            console.table(aux)
            setLoading(false);
        };

        const qry = query(collection(db, 'orders'), where('buyer.email', '==', buyerInfo.email));
        addToOrders(qry);
    }, [])

    if (loading)
        return (
            <Loading />
        )

    return <div className="ordenes">
        <h1>Mis Ordenes</h1>
        <Listado orders={orders} />
        <div className="clear"></div>
    </div>;
};

export default Orders;
