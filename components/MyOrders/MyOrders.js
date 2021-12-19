import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../OrderCard/OrderCard";
import { Button } from "react-native-paper";

export default function MyOrders() {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    // console.log(cart.length);

    const getItems = async () => {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        );
        const data = await response.json();
        setItems(data.meals);

        const data1 = await getData();
        updateCart(data1);
    };
    getItems();

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            return jsonValue ? JSON.parse(jsonValue) : {};
            // console.log("getData", data);
        } catch (e) {
            // error reading value
        }
    };

    function updateCart(data) {
        const newCart = [];
        const keys = Object.keys(data);
        // console.log(keys);
        for (const key of keys) {
            // console.log(data[key]);
            const item = items.find((item) => item.idMeal == key);
            // console.log(item);
            if (item) {
                item["quantity"] = data[key];
                newCart.push(item);
            }
        }
        // console.log("newCart", newCart);
        setCart(newCart);
        // console.log(cart);
    }

    const renderItem = ({ item }) => {
        return <OrderCard item={item}></OrderCard>;
    };

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "blueviolet",
                    marginVertical: 10,
                }}
            >
                Items You Added
            </Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item?.idMeal}
                renderItem={renderItem}
                numColumns={1}
            />
            <Text>Total Price: 1999TK</Text>
            <TouchableOpacity>
                <Button
                    mode="outlined"
                    style={{
                        margin: 10,
                    }}
                >
                    Place Order
                </Button>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 2,
    },
});
