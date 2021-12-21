import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useParams } from "react-router";
import YoutubePlayer from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, ActivityIndicator, Colors } from "react-native-paper";

export default function ItemDetails() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const vid = item?.strYoutube?.split("=")[1];

    useEffect(() => {
        const getItem = async () => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await response.json();

            setItem(data.meals[0]);
            setLoading(false);
        };

        getItem();
    }, [id]);

    const storeData = async (id) => {
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
        // console.log(newCart);
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

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} color={Colors.blue800} />
            </View>
        );
    }

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.strMealThumb }} />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Card.Title
                        style={{ flex: 1 }}
                        title={item.strMeal}
                        subtitle={item.strCategory}
                    />
                    <Card.Title
                        style={{ flex: 1 }}
                        title={`${item.strArea} Food`}
                        subtitle={"199TK"}
                    />
                </View>
                <Card.Content>
                    <Text numberOfLines={5}>{item.strInstructions}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="outlined"
                        icon="cart"
                        onPress={() => {
                            alert("Item Added!");
                            storeData(item.idMeal);
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        Add To Cart
                    </Button>
                    <Button
                        mode="outlined"
                        icon="food"
                        onPress={() => {
                            alert("Item Added!");
                            storeData(item.idMeal);
                        }}
                    >
                        See Menu
                    </Button>
                </Card.Actions>
            </Card>

            <View style={{ margin: 10 }}>
                <Text
                    style={{
                        borderLeftWidth: 5,
                        paddingLeft: 5,
                        marginVertical: 5,
                        borderLeftColor: "blueviolet",
                        fontSize: 24,
                        color: "blueviolet",
                    }}
                >
                    Recipe
                </Text>
                <YoutubePlayer height={300} videoId={vid} style={{ flex: 1 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 5,
    },
});
