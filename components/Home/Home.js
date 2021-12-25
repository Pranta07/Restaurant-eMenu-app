import React from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
        >
            <View style={styles.home}>
                <Image
                    source={{
                        uri: "https://i.ibb.co/dMCvHP4/Pngtree-cartoon-chef-583043.png",
                    }}
                    style={{ width: "100%", height: 250 }}
                />
                <Text
                    style={{
                        color: "#e3b3bb",
                        fontSize: 44,
                        fontWeight: "bold",
                        fontStyle: "italic",
                        letterSpacing: 3,
                    }}
                >
                    Cookaroo
                </Text>
                <TouchableOpacity>
                    <Button
                        mode="contained"
                        icon="food"
                        style={{
                            margin: 10,
                        }}
                        onPress={() => {
                            navigate("/menu");
                        }}
                    >
                        See Menu
                    </Button>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    home: {
        alignItems: "center",
        top: 70,
    },
});
