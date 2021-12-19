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
                        onPress={() => {
                            alert("Item Added!");
                            storeData(item.idMeal);
                        }}
                    >
                        Add To Cart
                    </Button>
                </Card.Actions>
            </Card>

            <View style={{ margin: 10 }}>
                <Text>Recipe Video</Text>
                <YoutubePlayer height={300} videoId={vid} />
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
