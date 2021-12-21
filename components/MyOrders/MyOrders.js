import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../OrderCard/OrderCard";
import { ActivityIndicator, Button, Colors } from "react-native-paper";

const MyOrders = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.meals);
                updateCart(data.meals);
            });
    }, []);

    //reading data from async storage
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            return jsonValue ? JSON.parse(jsonValue) : {};
        } catch (e) {
            // error reading value
        }
    };

    //updating cart items with actual data
    const updateCart = async (items) => {
        const data = await getData();
        // console.log(data);

        const keys = Object.keys(data);

        const newCart = keys.map((key) => {
            const item = items?.find((item) => item.idMeal == key);
            // console.log(item);
            if (item) {
                item["quantity"] = data[key];
            }
            return item;
        });

        setCart(newCart);
        // console.log("newCart", newCart);
        setLoading(false);
    };

    const handlePlus = (id, q) => {
        updateQuantity(id, q + 1);
    };

    const handleMinus = (id, q) => {
        if (q > 1) {
            updateQuantity(id, q - 1);
        }
    };

    // handle quantity of cart items
    const updateQuantity = async (id, q) => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            const data = jsonValue ? JSON.parse(jsonValue) : {};

            data[id] = q;

            await AsyncStorage.setItem("cart", JSON.stringify(data));
            updateCart(items);
        } catch (e) {
            console.log(e.message);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <OrderCard
                item={item}
                handlePlus={handlePlus}
                handleMinus={handleMinus}
            ></OrderCard>
        );
    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} color={Colors.blue800} />
            </View>
        );
    }

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
                    onPress={() => {
                        alert("Order Placed!");
                    }}
                >
                    Place Order
                </Button>
            </TouchableOpacity>
            <TouchableOpacity>
                <Button
                    mode="outlined"
                    style={{
                        margin: 10,
                    }}
                    onPress={() => {
                        alert("Order Placed!");
                    }}
                >
                    Clear Cart
                </Button>
            </TouchableOpacity>
        </View>
    );
};

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
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MyOrders;
