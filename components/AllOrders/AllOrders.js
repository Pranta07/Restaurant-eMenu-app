import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Badge,
    Button,
    Card,
    IconButton,
} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import useAuth from "../../hooks/useAuth";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chef, setChef] = useState(false);
    const [done, setDone] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        setDone(false);
        setLoading(true);
        fetch(`https://mighty-thicket-60343.herokuapp.com/manage/orders`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllOrders(data);
                setLoading(false);
            });
        fetch(`https://mighty-thicket-60343.herokuapp.com/users/${user.email}`)
            .then((res) => res.json())
            .then((user) => {
                console.log(user.role, chef);
                if (user.role === "chef") setChef(true);
            })
            .finally(() => setDone(true));
    }, []);

    const renderItem = ({ item }) => {
        const items = item.orderedItems;
        return (
            <View style={styles.box}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            marginVertical: 2,
                        }}
                    >
                        Order Id: {item._id}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginVertical: 2,
                        }}
                    >
                        Customer Email: {item.email}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginVertical: 2,
                        }}
                    >
                        Payment Status:{" "}
                        {item.paymentStatus ? "Paid" : "Pending"}
                    </Text>
                </View>
                {items.map((elem) => (
                    <Card key={elem?.name} style={styles.card}>
                        <Card.Title
                            title={elem?.name}
                            subtitle={`Food Status: ${item?.foodStatus}`}
                            left={(props) => (
                                <Avatar.Image
                                    {...props}
                                    size={40}
                                    source={{
                                        uri: elem?.img,
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
                                        X {elem.quantity}
                                    </Badge>
                                </View>
                            )}
                        />
                    </Card>
                ))}
                {chef && (
                    <Button
                        mode="contained"
                        icon="update"
                        style={{
                            marginHorizontal: 5,
                        }}
                    >
                        Update Food Status
                    </Button>
                )}
            </View>
        );
    };

    if (loading || !done) {
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
                Manage All Orders
            </Text>
            <FlatList
                data={allOrders}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                numColumns={1}
            />
        </View>
    );
};

export default AllOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
        margin: 10,
        padding: 8,
        width: 330,
    },
    card: {
        margin: 5,
        borderRadius: 5,
    },
});
