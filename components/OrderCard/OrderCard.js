import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Avatar, IconButton, Badge } from "react-native-paper";

const OrderCard = ({ item }) => {
    const [text, setText] = useState(1);

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
                    <IconButton
                        icon="minus"
                        size={20}
                        onPress={() => {
                            item.quantity--;
                            setText(item.quantity);
                        }}
                    />
                    <Badge
                        size={30}
                        style={{
                            marginHorizontal: 5,
                        }}
                    >
                        {text}
                    </Badge>
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => {
                            item.quantity++;
                            setText(item.quantity);
                        }}
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
