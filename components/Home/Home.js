import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
    Searchbar,
    Card,
    Avatar,
    IconButton,
    ActivityIndicator,
    Colors,
    Title,
} from "react-native-paper";

export default function Home() {
    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => setSearchQuery(query);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // const itemsRef = useRef([]);

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
            );
            const data = await response.json();

            // itemsRef.current = items;
            setItems(data.meals);
            setLoading(false);
        };

        getItems();
    }, [searchQuery]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
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
                        <IconButton {...props} icon="plus" onPress={() => {}} />
                    )}
                />
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
