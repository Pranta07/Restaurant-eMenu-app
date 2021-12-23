import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    Colors,
    Snackbar,
} from "react-native-paper";
import { useNavigate } from "react-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import OrderCard from "../OrderCard/OrderCard";
import useAuth from "../../hooks/useAuth";

const MyOrders = () => {
    const [visible, setVisible] = useState(true);
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const [orderDetails, setOrderDetials] = useState({
        email: user.email,
    });

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.meals);
                updateCart(data.meals);
            });
    }, []);

    const onDismissSnackBar = () => setVisible(false);

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

    //handle order placing
    const handlePlaceOrder = () => {
        // console.log(orderDetails);
        let price = 0;
        const orderedItems = cart.map((item) => {
            price += item.quantity * 100;
            const newItem = {
                name: item.strMeal,
                quantity: item.quantity,
                img: item.strMealThumb,
            };
            return newItem;
        });

        orderDetails["orderedItems"] = orderedItems;
        orderDetails["price"] = price;
        orderDetails["status"] = false;

        //send orderdetails data to server
        fetch("https://mighty-thicket-60343.herokuapp.com/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.insertedId) {
                    alert("Your Order Placed Successfully");
                    AsyncStorage.clear();
                }
            })
            .finally(() => navigate("/pay"));
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
            {cart.length > 0 && (
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
            )}
            {cart.length == 0 && (
                <View
                    style={{
                        height: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Text>No Items in your cart yet! Go to menu page!</Text>
                    <TouchableOpacity>
                        <Button
                            mode="contained"
                            style={{
                                margin: 10,
                            }}
                            onPress={() => {
                                navigate("/menu");
                            }}
                        >
                            See Menu
                        </Button>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={cart}
                keyExtractor={(item) => item?.idMeal}
                renderItem={renderItem}
                numColumns={1}
            />
            <Text>Total Price: 999TK</Text>
            <View style={styles.buttonConatiner}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Button
                        mode="outlined"
                        style={{
                            margin: 10,
                        }}
                        icon="cart-off"
                        onPress={() => {
                            AsyncStorage.clear();
                            alert("Now you have no items in your cart!");
                            navigate("/menu");
                        }}
                    >
                        Clear Cart
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Button
                        mode="outlined"
                        style={{
                            margin: 10,
                        }}
                        icon="arrow-right-bold-circle-outline"
                        onPress={() => {
                            // alert("Order Placed!");
                            handlePlaceOrder();
                            // navigate("/pay");
                        }}
                        disabled={user.email ? false : true}
                    >
                        Place Order
                    </Button>
                </TouchableOpacity>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: "Hide",
                    }}
                >
                    Before Placing Order You have to login first!
                </Snackbar>
            </View>
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
    buttonConatiner: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default MyOrders;
