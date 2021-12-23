import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();

    const navigate = useNavigate();

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

    const handlePay = () => {
        //payment status update korte hobe db te.
        alert("Payment Success!");
        // navigate("/trackMyOrders");
    };

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
                    icon="credit-card-multiple"
                    style={{
                        margin: 10,
                    }}
                    onPress={() => {
                        handlePay();
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
