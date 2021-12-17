import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
        >
            <View style={styles.home}>
                <Text
                    style={{ color: "white", fontSize: 40, fontWeight: "bold" }}
                >
                    Chef Club
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    home: {
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        top: 80,
    },
});
