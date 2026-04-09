import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000";

const useCart = (user_id) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        if (!user_id) {
            setCart([]);
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${BASE_URL}/allCartItems/${user_id}`);
            const data = await res.json();
            if (res.ok && data.success) {
                setCart(data.data);
            } else {
                setCart([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();

        const handleUpdate = () => fetchCart();

        window.addEventListener("cartUpdated", handleUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleUpdate);
        };
    }, [user_id]);

    return [cart, fetchCart, loading];
};

export default useCart;