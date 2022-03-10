import { useEffect, useState } from 'react';
//import './Catalogo.css';
import { useParams } from 'react-router-dom';
import { collection, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import Loading from '../loading/Loading';

const Favorites = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {

        const db = getFirestore();

        const addToCatalog = async (query) => {
            //const aux = [];
            const result = await getDocs(query);
            result.docs.map(async (item) => {
                let favorito = item.data();
                favorito.id = item.id;
                //aux.push(prod);
                setFavoritos([...favoritos, favorito])
            })
            //setCatalog(aux);
            setLoading(false);
        };

        const qry = collection(db, 'items');
        addToCatalog(qry);
    }, [])

    if (loading)
        return (
            <Loading />
        )

    return <div className="catalogo">
        <h1>Mis Favoritos</h1>
        {/*<Listado products={catalog} />*/}
        <h2>Coming Soon</h2>
        <div className="clear"></div>
    </div>;
};

export default Favorites;
