import { useState, useContext } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom'
import './Producto.css';
import { CartContext } from '../../context/CartContext';
import FavoriteWidget from '../favorites/FavoriteWidget';

const Producto = ({ product, getDetail = false }) => {
    const { buyerInfo, addItem, isInCart } = useContext(CartContext);

    const [unitSelected, setUnitSelected] = useState(0);

    const onChange = (units) => {
        setUnitSelected(units);
    }

    const addToCart = () => {
        if (unitSelected > 0) {
            addItem(product, unitSelected);
        }
    };

    return <div className={getDetail ? 'detalle' : 'uncuarto'}>
        <div className="marco">
            <Link to={'/item/' + product.id} className="viewDetail">
                <img src={product.image} title={product.name} alt={product.nombre} />
            </Link>
            <div className="info">
                <div className="tipo">
                    {product.categoryName} <div className="pais-anio"> - {product.country} - {product.year}</div>
                    {buyerInfo.name !== '' && <FavoriteWidget product={product} />}
                </div>
                <div className="titulo">{product.name}</div>
                <div className="stock">{product.stock > 0 && <span>Stock: {product.stock}</span>}</div>
                <div className="precio"><strong>AR$</strong> {product.price}</div>
                {getDetail && <div className="descripcion">{product.description}</div>}
                {isInCart(product.id) ?
                    <div>
                        <div className="itemAgregado"><span>{product.categoryName} Agregad{product.categoryName === 'Juego' ? 'o' : 'a'}</span></div>
                        <Link to={'/cart'} className="viewCart">Ver Mi Carrito</Link>
                    </div>
                    : product.stock > 0 ?
                        <>
                            <ItemCount stock={product.stock} initial={0} onChange={onChange} />
                            <button onClick={addToCart}>Agregar al Carrito</button>
                        </>
                        :
                        <div className="sinStock"><span>SIN STOCK!</span></div>
                }
                {!getDetail && <Link to={'/item/' + product.id} className="viewDetail">Ver Detalle</Link>}
            </div>
            <div className="clear"></div>
        </div>
    </div>;
};

export default Producto;