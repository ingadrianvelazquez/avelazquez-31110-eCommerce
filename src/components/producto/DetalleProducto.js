import { useEffect, useState } from 'react';
import Producto from '../producto/Producto';
import loadingZombie from '../../img/loadingZombie.gif';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const DetalleProducto = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const db = getFirestore();

        const docRef = doc(db, 'items', id);
        getDoc(docRef).then((item) => {
            if (item.exists()) {
                let prod = item.data();
                prod.id = item.id;
                getDoc(prod.categoryId).then((category) => {
                    let cat = category.data();
                    prod.category = cat.categoryLabel;
                    prod.categoryName = cat.categoryName;
                    setProduct(prod);
                })
            }
        }).finally(() => {
            setLoading(false);
        });
    }, [id])

    if (loading) {
        return <div className="loading">
            <p>cargando...</p>
            <img src={loadingZombie} alt="Loading" title="Loading" />
            <p>cargando...</p>
        </div>
    }

    return <div className="detalleProducto">
        {id && product.name?.length > 0 &&
            <Producto key={product.id} product={product} getDetail={true} />
        }
        {product.length === 0 &&
            <div>
                <h2>NO existe el producto buscado!</h2>
            </div>
        }
        <div className="clear"></div>
    </div>;
};

export default DetalleProducto;
