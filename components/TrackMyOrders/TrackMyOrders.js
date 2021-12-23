import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Badge,
    Button,
    Card,
    Colors,
    IconButton,
} from "react-native-paper";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const TrackMyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const navigate = useNavigate();

    const mergeOrders = [];
    myOrders?.forEach((order) => {
        const items = order.orderedItems;
        items?.forEach((item) => {
            mergeOrders.push(item);
        });
    });

    useEffect(() => {
        setLoading(true);
        fetch(`https://mighty-thicket-60343.herokuapp.com/orders/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setMyOrders(data);
                setLoading(false);
            });
    }, [user.email]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Card style={styles.card}>
                    <Card.Title
                        title={item?.name}
                        subtitle={`Food Status: ${item?.status}`}
                        left={(props) => (
                            <Avatar.Image
                                {...props}
                                size={40}
                                source={{
                                    uri: item?.img,
                                }}
                            />
                        )}
                        right={(props) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <IconButton {...props} icon="food" />
                                <Badge
                                    style={{
                                        marginBottom: 25,
                                        marginRight: 10,
                                    }}
                                >
                                    X {item.quantity}
                                </Badge>
                            </View>
                        )}
                    />
                </Card>
            </View>
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
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}
            >
                You have Ordered {mergeOrders.length} Items!
            </Text>
            <FlatList
                data={mergeOrders}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                numColumns={1}
            />
            <TouchableOpacity>
                <Button
                    mode="contained"
                    style={{
                        margin: 10,
                    }}
                    onPress={() => {
                        navigate("/pay");
                    }}
                >
                    Pay
                </Button>
            </TouchableOpacity>
        </View>
    );
};

export default TrackMyOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        margin: 5,
        borderRadius: 5,
    },
    item: {
        width: 350,
    },
});
