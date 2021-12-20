import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Link } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Searchbar,
    Card,
    Title,
    Avatar,
    IconButton,
    ActivityIndicator,
    Colors,
    Button,
} from "react-native-paper";

export default function Menu() {
    const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data.meals);
                setLoading(false);
            });
    }, [searchQuery]);

    const storeData = async (id) => {
        // await AsyncStorage.clear();
        const data = await getData();
        // console.log(data);
        let newCart = {};
        if (data) {
            newCart = data;
            if (newCart[id]) newCart[id]++;
            else newCart[id] = 1;
        } else {
            newCart[id] = 1;
        }
        console.log(newCart);
        try {
            const jsonValue = JSON.stringify(newCart);
            await AsyncStorage.setItem("cart", jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        // await AsyncStorage.clear();
        try {
            const jsonValue = await AsyncStorage.getItem("cart");
            return jsonValue ? JSON.parse(jsonValue) : {};
            // console.log(jsonValue);
        } catch (e) {
            // error reading value
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Card style={styles.card}>
                    <Card.Title
                        title={item.strMeal}
                        subtitle="Price: 250"
                        left={(props) => (
                            <Avatar.Image
                                {...props}
                                size={40}
                                source={{
                                    uri: item.strMealThumb,
                                }}
                            />
                        )}
                        right={(props) => (
                            <IconButton
                                {...props}
                                icon="plus"
                                onPress={() => {
                                    alert("Item Added!");
                                    storeData(item.idMeal);
                                }}
                            />
                        )}
                    />
                    <Card.Actions>
                        <Link to={`/details/${item.idMeal}`}>
                            <Button>View Details</Button>
                        </Link>
                    </Card.Actions>
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
            <Text style={styles.resName}>Hungry Chef!</Text>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Title>Menu Items</Title>
            <FlatList
                data={items}
                keyExtractor={(item) => item.idMeal}
                renderItem={renderItem}
                numColumns={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        margin: 5,
        borderRadius: 5,
    },
    resName: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 10,
        color: "blueviolet",
    },
    item: {
        width: 350,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
        margin: 10,
    },
});
