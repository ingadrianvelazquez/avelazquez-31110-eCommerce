import NotFound from '../not-found/NotFound';
import Producto from '../producto/Producto';

const Listado = ({ products }) => {

    return <div>
        {products.length > 0 && products.map((product) => (
            <Producto key={product.id} product={product} />
        ))}
        {products.length === 0 &&
            <NotFound from="cat" />}
    </div>;
};

export default Listado;
