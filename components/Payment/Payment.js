import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Colors } from "react-native-paper";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUpdate from "../../hooks/useUpdate";

const Payment = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://mighty-thicket-60343.herokuapp.com/orders/${user?.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setMyOrders(data);
                setLoading(false);
            });
    }, []);

    const handlePay = () => {
        //updating payment status
        fetch(`https://mighty-thicket-60343.herokuapp.com/pay/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount) {
                    alert("Payment Success!");
                    //updating food status
                    useUpdate("Processing", user.email);
                    navigate("/trackMyOrders");
                } else {
                    alert("Already Paid!");
                    navigate("/trackMyOrders");
                }
            });
    };

    let totalPrice = 0;
    myOrders.forEach((order) => {
        if (order.paymentStatus === false) totalPrice += order.price;
    });

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} color={Colors.blue800} />
            </View>
        );
    }

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
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Payment;
