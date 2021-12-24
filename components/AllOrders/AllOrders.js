import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://mighty-thicket-60343.herokuapp.com/manage/orders`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllOrders(data);
                setLoading(false);
            });
    }, []);

    return (
        <View>
            <Text>All Orders Page</Text>
        </View>
    );
};

export default AllOrders;

const styles = StyleSheet.create({});
