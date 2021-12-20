import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Avatar, IconButton, Badge } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderCard = ({ item }) => {
    // const [quantity, setQuantitiy] = useState(item.quantity);

    const handlePlus = () => {
        // item.quantity++;
        // setQuantitiy(item.quantity);
        updateData(item.quantity + 1);
    };

    const handleMinus = () => {
        if (item.quantity > 1) {
            // item.quantity--;
            // setQuantitiy(item.quantity);
            updateData(item.quantity - 1);
        }
    };

    const updateData = async (q) => {
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            const data = jsonValue ? JSON.parse(jsonValue) : {};

            data[item?.idMeal] = q;

            await AsyncStorage.setItem("cart", JSON.stringify(data));
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <View style={styles.item}>
            <Card style={styles.card}>
                <Card.Title
                    title={item?.strMeal}
                    subtitle="Price: 250"
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            size={40}
                            source={{
                                uri: item?.strMealThumb,
                            }}
                        />
                    )}
                    right={(props) => <IconButton {...props} icon="food" />}
                />
                <Card.Actions
                    style={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <IconButton icon="minus" size={20} onPress={handleMinus} />
                    <Badge
                        size={30}
                        style={{
                            marginHorizontal: 5,
                        }}
                    >
                        {item.quantity}
                    </Badge>
                    <IconButton icon="plus" size={20} onPress={handlePlus} />
                </Card.Actions>
            </Card>
        </View>
    );
};

export default OrderCard;

const styles = StyleSheet.create({
    card: {
        margin: 5,
        borderRadius: 5,
    },
    item: {
        width: 350,
    },
});
