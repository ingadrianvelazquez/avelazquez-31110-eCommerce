import { useContext } from 'react';
import { Link } from 'react-router-dom'
import './LoginWidget.css';
import userGoogle from '../../img/userGoogle.png';
import { CartContext } from '../../context/CartContext';

const LoginWidget = () => {
    const { buyerInfo } = useContext(CartContext);

    return <>
        {buyerInfo.name === '' ?
            <Link to="/login" className="googleImage">
                <img src={userGoogle} title="Login con Google" alt="Login con Google" width="48" />
            </Link>
            :
            <Link to="/logout" className="googleImage">
                <img src={buyerInfo.photoURL} title="Logout" alt="Logout" width="48" referrerPolicy="no-referrer" />
            </Link>}
    </>
};

export default LoginWidget;
