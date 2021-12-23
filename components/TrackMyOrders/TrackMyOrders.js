import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "../../hooks/useAuth";

const TrackMyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

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
    return (
        <View>
            <Text>Track my orders!</Text>
        </View>
    );
};

export default TrackMyOrders;

const styles = StyleSheet.create({});
