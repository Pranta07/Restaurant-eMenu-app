import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";

export default function App() {
    return (
        <PaperProvider style={styles.container}>
            <Navigation></Navigation>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 15,
        alignItems: "center",
    },
});
