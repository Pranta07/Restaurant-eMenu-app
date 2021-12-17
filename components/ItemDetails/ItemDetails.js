import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useParams } from "react-router";
import {
    Button,
    Card,
    Title,
    ActivityIndicator,
    Colors,
} from "react-native-paper";

export default function ItemDetails() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

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
                <Card.Title title={item.strMeal} subtitle={item.strCategory} />
                <Card.Content>
                    <Title>{item.strArea} Food</Title>
                    <Title>199TK</Title>
                    <Text numberOfLines={5}>{item.strInstructions}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => {}}>Order</Button>
                </Card.Actions>
            </Card>
            <Card style={styles.card}>
                <Card.Content></Card.Content>
            </Card>
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
