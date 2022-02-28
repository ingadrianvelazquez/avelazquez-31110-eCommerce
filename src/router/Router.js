import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import Catalogo from '../components/catalogo/Catalogo';
import NotFound from '../components/not-found/NotFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleProducto from '../components/producto/DetalleProducto';
import Cart from '../components/cart/Cart';

const Router = () => {

    return <BrowserRouter>
        <header>
            <NavBar />
        </header>
        <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/home" element={<Catalogo />} />
            <Route path="/category/:id" element={<Catalogo />} />
            <Route path="/item/:id" element={<DetalleProducto />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>;
};

export default Router;