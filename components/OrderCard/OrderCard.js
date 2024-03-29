import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Avatar, IconButton, Badge } from "react-native-paper";

const OrderCard = ({ item, handlePlus, handleMinus }) => {
    return (
        <View style={styles.item}>
            <Card style={styles.card}>
                <Card.Title
                    title={item?.strMeal}
                    subtitle="Price: 100TK"
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
                    <IconButton
                        icon="minus"
                        size={20}
                        onPress={() => handleMinus(item.idMeal, item.quantity)}
                    />
                    <Badge
                        size={30}
                        style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                        }}
                    >
                        {item?.quantity}
                    </Badge>
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => handlePlus(item.idMeal, item.quantity)}
                    />
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
