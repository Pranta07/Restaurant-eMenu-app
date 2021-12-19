import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-native";

const Navigation = () => {
    const { user, handleSignOut } = useAuth();
    const { cart } = useCart();

    return (
        <Appbar style={styles.bottom}>
            <Link to="/">
                <Appbar.Action icon="home" />
            </Link>
            <Link to="/menu">
                <Appbar.Action icon="food" />
            </Link>
            <Link to="/orders">
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Appbar.Action icon="cart" />
                    <Text style={{ fontStyle: "italic" }}>{cart.length}</Text>
                </View>
            </Link>
            {user.email ? (
                <Appbar.Action icon="logout" onPress={handleSignOut} />
            ) : (
                <Link to="/login">
                    <Appbar.Action icon="account" />
                </Link>
            )}
        </Appbar>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    bottom: {
        // position: "absolute",
        backgroundColor: "white",
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        paddingTop: 10,
    },
});
