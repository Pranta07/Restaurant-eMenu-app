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

    return { data };
};

export default useCart;
