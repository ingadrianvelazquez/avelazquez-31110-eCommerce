import Producto from '../producto/Producto';

const Listado = ({ products }) => {

    return <div>
        {products && products.length > 0 && products.map((product) => (
            <Producto key={product.id} product={product} />
        ))}
        {products.length === 0 &&
            <div>
                <h2>NO existen elementos asociados a la categoría seleccionada!</h2>
            </div>}
    </div>;
};

export default Listado;
