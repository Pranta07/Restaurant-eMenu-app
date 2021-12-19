import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../OrderCard/OrderCard";

export default function MyOrders() {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    // console.log(cart.length);
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            const data = jsonValue ? JSON.parse(jsonValue) : {};
            // console.log(data);
            updateCart(data);
        } catch (e) {
            // error reading value
        }
    };
    getData();

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=`
            );
            const data = await response.json();

            setItems(data.meals);
        };
        getItems();
    }, []);

    const updateCart = (data) => {
        const newCart = [];
        for (const key in data) {
            // console.log(data[key]);
            const item = items.find((item) => item?.idMeal == key);
            item["quantity"] = data[key];
            newCart.push(item);
        }
        // console.log(newCart);
        setCart(newCart);
    };

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
