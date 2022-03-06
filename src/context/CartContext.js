import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartInfo, setCartInfo] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItem = (currentItem, quantity) => {
        if (quantity === 0)
            removeItem(currentItem.id);
        else {
            currentItem.quantity = quantity;
            if (!isInCart(currentItem.id))
                setCartInfo([...cartInfo, currentItem]);
        }
    }

    const removeItem = (itemId) => {
        setCartInfo(cartInfo.filter(product => product.id !== itemId))
    }

    const clear = () => {
        setCartInfo([]);
        setTotalAmount(0);
    }

    const isInCart = (itemId) => {
        return cartInfo?.some((item) => item.id === itemId) ? true : false;
    }

    const getTotalAmount = () => {
        let aux = 0;
        if (cartInfo.length !== 0) {
            cartInfo.forEach((product) => {
                aux += (product.price * product.quantity);
            })
        }
        setTotalAmount(aux);
    }

    const getQuantity = () => {
        let rtn = 0;
        cartInfo.forEach((product) => {
            rtn += product.quantity;
        })
        return rtn;
    }

    return (
        <CartContext.Provider value={{ cartInfo, totalAmount, addItem, clear, removeItem, isInCart, setTotalAmount, getTotalAmount, getQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
