import './Producto.css';
import './ProductoCarrito.css';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from './ItemCount';

const ProductoCarrito = ({ product, onChangeFn }) => {
    const { removeItem } = useContext(CartContext);

    const removeProduct = () => {
        removeItem(product.id);
    }

    const onChange = (units) => {
        onChangeFn(product, units);
    }

    return <div className="productoCarrito">
        <div className="thumb">
            <img src={product.image} title={product.name} alt={product.nombre} />
        </div>
        <div className="info">
            <div className="titulo">{product.name}</div>
            <div className="detalle">{product.categoryName} - {product.country} - {product.year}</div>
        </div>
        <div className="precio">
            <div>Precio Unitario</div>
            <div>AR$ {product.price}</div>
        </div>
        <div className="cantidad">
            <div>Cantidad</div>
            <ItemCount stock={product.stock} initial={product.quantity} onChange={onChange} />
        </div>
        <div className="subTotal">
            <div>SubTotal</div>
            <div>AR$ {product.price * product.quantity}</div>
        </div>
        <div className="accion">
            <button className="quitarProducto" onClick={removeProduct}>Quitar</button>
        </div>
        <div className="clear"></div>
    </div>;
};

export default ProductoCarrito;