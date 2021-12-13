import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function Home() {
    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <Text style={styles.resName}>Restaurant Name!</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
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
        fontFamily: "roboto",
        marginTop: 15,
        marginBottom: 10,
        color: "blueviolet",
    },
});
