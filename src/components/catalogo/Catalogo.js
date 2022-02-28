import { useEffect, useState } from 'react';
import './Catalogo.css';
import loadingZombie from '../../img/loadingZombie.gif';
import { useParams } from 'react-router-dom';
import Listado from './Listado'
import { collection, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';

const Catalogo = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [catalog, setCatalog] = useState([]);

    useEffect(() => {

        const db = getFirestore();

        const addToCatalog = async (query) => {
            const aux = [];
            const prods = await getDocs(query);
            await Promise.all(
                prods.docs.map(async (item) => {
                    let prod = item.data();
                    prod.id = item.id;
                    const category = await getDoc(prod.categoryId);
                    let cat = category.data();
                    prod.category = cat.categoryLabel;
                    prod.categoryName = cat.categoryName;
                    aux.push(prod);
                })
            );
            setCatalog(aux);
            setLoading(false);
        };

        if (id?.length > 0) {
            let catId = '';
            const qryCat = query(collection(db, 'categories'), where('categoryLabel', '==', id), limit(1));
            getDocs(qryCat).then((cats) => {
                if (!cats.empty) {
                    catId = cats.docs[0].ref;
                    const qry = query(collection(db, 'items'), where('categoryId', '==', catId));
                    addToCatalog(qry);
                }
            }).finally(() => {
                setLoading(false);
            });
        } else {
            const qry = collection(db, 'items');
            addToCatalog(qry);
        }
    }, [id])

    if (loading) {
        return <div className="loading">
            <p>cargando...</p>
            <img src={loadingZombie} alt="Loading" title="Loading" />
            <p>cargando...</p>
        </div>
    }

    return <div className="catalogo">
        <h1>{id ? 'Categoría ' + id : 'Destacados'}</h1>
        <Listado products={catalog} />
        <div className="clear"></div>
    </div>;
};

export default Catalogo;
