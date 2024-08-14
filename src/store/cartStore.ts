// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string;
    quantity: number;
    price: number;
    image: string;
    title: string;
}

interface CartState {
    cartItems: CartItem[];
    totalPrice: number;
    addItemToCart: (
        param_id: string,
        param_price: number,
        param_quantity: number,
        param_image: string,
        param_title: string
    ) => void;
    removeItemFromCart: (param_id: string) => void;
    decreaseItemQuantity: (param_id: string) => void;
    increaseItemQuantity: (param_id: string) => void;
    getItemQuantity: (param_id: string) => number;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            totalPrice: 0,
            addItemToCart: (
                id: string,
                price: number,
                quantity: number,
                image: string,
                title: string
            ) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (item) => item.id === id
                    );
                    if (existingItem) {
                        const updatedCartItems = state.cartItems.map((item) =>
                            item.id === id
                                ? {
                                      ...item,
                                      quantity: item.quantity + quantity,
                                  }
                                : item
                        );
                        const updatedTotalPrice =
                            state.totalPrice + price * quantity;
                        return {
                            cartItems: updatedCartItems,
                            totalPrice: updatedTotalPrice,
                        };
                    }
                    return {
                        cartItems: [
                            ...state.cartItems,
                            { id, quantity, price, image, title },
                        ],
                        totalPrice: state.totalPrice + price * quantity,
                    };
                }),
            removeItemFromCart: (id: string) =>
                set((state) => {
                    const item = state.cartItems.find((item) => item.id === id);
                    if (!item) {
                        return state;
                    }

                    return {
                        cartItems: state.cartItems.filter(
                            (item) => item.id !== id
                        ),
                        totalPrice:
                            state.totalPrice - item.price * item.quantity,
                    };
                }),
            decreaseItemQuantity: (id: string) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (item) => item.id === id
                    );
                    if (existingItem && existingItem.quantity > 1) {
                        const updatedCartItems = state.cartItems.map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        );
                        const updatedTotalPrice =
                            state.totalPrice - existingItem.price;
                        return {
                            cartItems: updatedCartItems,
                            totalPrice: updatedTotalPrice,
                        };
                    }
                    return state;
                }),
            increaseItemQuantity: (id: string) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (item) => item.id === id
                    );
                    if (existingItem) {
                        const updatedCartItems = state.cartItems.map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );
                        const updatedTotalPrice =
                            state.totalPrice + existingItem.price;
                        return {
                            cartItems: updatedCartItems,
                            totalPrice: updatedTotalPrice,
                        };
                    }
                    return state;
                }),
            getItemQuantity: (id: string) => {
                const item = get().cartItems.find((item) => item.id === id);
                return item ? item.quantity : 0;
            },
        }),
        {
            name: "cart-storage", // name of the item in localStorage
        }
    )
);

export default useCartStore;
