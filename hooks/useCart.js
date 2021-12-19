import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useCart = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            const data = jsonValue ? JSON.parse(jsonValue) : {};
            setData(data);
            // console.log("getData", data);
        } catch (e) {
            // error reading value
        }
    };
    getData();

    /* const addToCart = (id) => {
        console.log(id);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setCart([...cart, data.meals[0]]))
            .finally(() => console.log(cart.length));
    }; */
    //console.log(cart.length);
    return { data };
};

export default useCart;
