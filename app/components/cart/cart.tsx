"use client"
import { 
    createContext, 
    useContext, 
    useEffect, 
    useState, 
    type ReactNode 
} from "react";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import type { Shape } from "@/interfaces/shapes";

// INterfaces used here
interface CartItem {
    shape: Shape,
    quantity: number
}

interface CartContext {
    cartItems: CartItem[],
    addToCart: (shape: Shape) => void,
    getCartItemsNumber: () => number
    clearCart: () => void
}

// Create our context for the cart
export const CartContext = createContext<CartContext | undefined>(undefined);

export const CartProvider = ({ children } : { children: ReactNode}) => {

    // is there localstorage? get that stuff, or set to arr nothing
    const [ cartItems, setCartItems ] = useState<CartItem[]>([]);

    // If there is localstorage cartItems, get it
    useEffect(() => {
        const saved = localStorage.getItem("cartItems");
        if (saved && saved !== "undefined") {
            setCartItems(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage whenever cartItems updates
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add shape to cart
    const addToCart = (shape: Shape) => {

        // Is shape in cart already?
        const isShapeInCart = cartItems.find((cartItem: CartItem) => cartItem.shape.id === shape.id);

        // If the shape is in the cart, update quantity, or else add it
        if(isShapeInCart) {
            setCartItems(
                cartItems.map((cartItem) => {
                    return cartItem.shape.id === shape.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem;
                })
            )
        } else {
            setCartItems([...cartItems, { shape, quantity: 1}]);
        }
    }

    // Throw out cart
    const clearCart = () => {
        console.log('clear cart ')
        setCartItems([]); // set the cart items to an empty array
    };

    // Get number of items in cart
    const getCartItemsNumber = () => {
        return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }

    // Set up provider
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            getCartItemsNumber,
            clearCart
        }}>
            { children }
        </CartContext.Provider>
    )

}

export const Cart = () => {

    // Get context vars
    const { getCartItemsNumber, cartItems, clearCart } = useContext(CartContext) ?? {};
    const [shouldPulse, setShouldPulse] = useState(false);
    const cartCount = getCartItemsNumber?.();

    // Nice pulse anim for adding to cart feedback
    useEffect(() => {
        setShouldPulse(true);
        const timeout = setTimeout(() => setShouldPulse(false), 600);
        return () => clearTimeout(timeout);
    }, [cartCount]);

    return (
        <>
            {/* ShadCN Popover works with both mobile and desktop, Hovercard is desktop only */}
            <Popover>
                <PopoverTrigger asChild>
                    <div className="minicart flex justify-center items-center flex-row mr-5 mt-5 sm:mt-0 cursor-pointer">
                        <svg className="cart-icon mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z" fill="currentColor" /> <path d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z" fill="currentColor" /> <path d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z" fill="currentColor" /> </svg>
                        <div className="cart-total relative">
                            <Badge className={`bg-red-500 text-white w-6 h-6 p-2`}>{getCartItemsNumber?.()}</Badge>
                            { shouldPulse ? (
                                <Badge className={`bg-red-500 text-white w-6 h-6 animate-ping absolute right-0 top-0}`}>{getCartItemsNumber?.()}</Badge>
                            ) : (null)}
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-50 flex-col gap-0.5 z-20">
                    <h2 className="font-semibold text-2xl">Cart</h2>
                    <div className="cart-contents">
                        { cartItems?.length === 0 ? (
                            <p className="w-full flex justify-center">Cart is empty!</p>
                        ) : (
                            <div>
                                { cartItems?.map((cartItem: CartItem, index: number) => (
                                    <div key={`cartItem-${index}`} className="cart-item flex flex-row justify-between items-center text-lg border border-slate-100 m-1 px-4 py-2">
                                        {cartItem.quantity} {cartItem.shape.name} <img className="w-10 h-10" src={`./images/${ cartItem.shape?.image }`} />
                                    </div>
                                ))}
                            </div>
                        ) }
                    </div>

                    { cartItems?.length ? (
                        <div className="cart-action-buttons">
                            <Button variant="destructive" className="w-full p-5 mb-2 border border-red-600 cursor-pointer">CHECKOUT</Button>
                            <Button variant="outline" className="w-full p-5 text-gray-500 cursor-pointer" onClick={() => clearCart?.()}>Clear Cart</Button>
                        </div>
                    ) : (null)}
                    
                    
                </PopoverContent>
            </Popover>
            
        </>
    )
}