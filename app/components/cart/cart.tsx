import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Shape } from "@/interfaces/shapes";

const CartContext = createContext(undefined);

interface CartItem {
    shape: Shape,
    quantity: number
}

export const CartProvider = ({ children } : { children: ReactNode}) => {

    // is there localstorage? get that stuff, or set to arr nothing
    const [ cartItems, setCartItems ] = useState<CartItem[]>(
        // If there is localstorage cartItems, get it
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cartItems") ?? "[]")
            : []
    );

    // Add shape to cart
    const addToCart = (shape: Shape) => {
        // Is shape in cart already?
        const isShapeInCart = cartItems.find((cartItem: CartItem) => cartItem.shape.id === shape.id);

        // If the shape is in the cart, update quantity, or else add it
        if(isShapeInCart) {
            setCartItems(
                cartItems.map((cartItem) => {
                    return cartItem.shape.id === shape.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
                })
            )
        }
    }

    const getCartItemsNumber = () => {
        return cartItems.length;
    }

}

export const Cart = () => {

    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
                <div className="minicart flex justify-center items-center flex-row mr-5 mt-5 sm:mt-0">
                    <svg className="cart-icon mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z" fill="currentColor" /> <path d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z" fill="currentColor" /> <path d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z" fill="currentColor" /> </svg>
                    <Badge className="bg-red-500 text-white">0</Badge>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-62 flex-col gap-0.5">
                <h2 className="font-semibold text-2xl">Cart</h2>
                <p className="w-full flex justify-center">Cart is empty!</p>
            </HoverCardContent>
        </HoverCard>
    )
}