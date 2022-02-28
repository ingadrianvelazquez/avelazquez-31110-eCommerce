import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartInfo, setCartInfo] = useState([]);
    const [cartInfoQty, setCartInfoQty] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItem = (currentItem, quantity) => {
        if (quantity === 0)
            removeItem(currentItem.id);
        currentItem.quantity = quantity;
        if (!isInCart(currentItem.id))
            setCartInfo([...cartInfo, currentItem]);
        setCartInfoQty(cartInfoQty + quantity);
    }

    const removeItem = (itemId) => {
        setCartInfo(cartInfo.filter(product => product.id !== itemId))
    }

    const clear = () => {
        setCartInfo([]);
    }

    const isInCart = (itemId) => {
        return cartInfo?.some((item) => item.id === itemId) ? true : false;
    }

    return (
        <CartContext.Provider value={{ cartInfo, totalAmount, addItem, clear, removeItem, isInCart, setTotalAmount }}>
            {children}
        </CartContext.Provider>
    );
}
