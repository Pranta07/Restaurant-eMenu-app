import { useState } from "react";

const useCart = () => {
    const [cart, setCart] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    const addToCart = (id) => {
        console.log(id);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCart([...cart, data.meals[0]]))
            .finally(() => console.log(cart.length));
    };
    //console.log(cart.length);
    return { cart, addToCart };
};

export default useCart;
