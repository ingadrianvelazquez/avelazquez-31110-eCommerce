import './OrderListItem.css';
import { Link } from "react-router-dom";

const OrderListItem = ({ orderId, order }) => {

    return <div className="orderListItem">
        <div className="elemTD codigo">
            Código de la orden
            <Link to={'/checkorder/' + orderId}>
                <span>{orderId}</span>
            </Link>
        </div>
        <div className="elemTD fecha">
            {order.state}
            <span>{order.date}</span>
        </div>
        <div className="elemTD thumbs">
            {order.items.map((item) => {
                return (
                    <img src={item.image} title={item.name} alt={item.nombre} />)
            })}
        </div>
        <div className="elemTD cantidad">
            Cantidad total
            <span>{order.items.length} unidades.</span>
        </div>
        <div className="elemTD total">
            Monto Total
            <span>AR$ {order.total}</span>
        </div>
        <div className="elemTD ver">
            <Link to={'/checkorder/' + orderId} className="viewDetail">
                Ver Detalle
            </Link>
        </div>
        <div className="clear"></div>
    </div>
};

export default OrderListItem;
