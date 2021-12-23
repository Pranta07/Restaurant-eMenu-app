import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(
            `https://mighty-thicket-60343.herokuapp.com/orders/${user?.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setMyOrders(data);
            });
    }, []);

    const totalPrice = myOrders.reduce(
        (previous, current) => previous + current.price,
        0
    );

    return (
        <View style={styles.container}>
            <Text>Payment Page</Text>
            <TouchableOpacity>
                <Button
                    mode="contained"
                    style={{
                        margin: 10,
                    }}
                    onPress={() => {
                        navigate("/myOrders");
                    }}
                >
                    Pay {totalPrice} TK
                </Button>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Payment;
