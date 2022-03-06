import './NotFound.css';
import zombie404 from '../../img/zombie404.png';

const NotFound = ({ from }) => {
    const msg = {
        'cat': <p>NO existen elementos asociados a la categoría seleccionada!</p>,
        'pag': <h1>Página NO encontrada!</h1>,
        'prd': <h1>NO existe el producto buscado!</h1>,
    }

    return <div className="notFound">
        {msg[from]}
        <img src={zombie404} alt="Sin Resultados" title="Sin Resultados" />
    </div>;
}

export default NotFound;
