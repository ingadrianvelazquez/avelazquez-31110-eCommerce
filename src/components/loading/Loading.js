import loadingZombie from '../../img/loadingZombie.gif';

const Loading = () => {
    return <div className="loading">
        <p>cargando...</p>
        <img src={loadingZombie} alt="Loading" title="Loading" />
        <p>cargando...</p>
    </div>
};

export default Loading;
