import * as React from "react";
import { Appbar, Badge } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-native";

const Navigation = () => {
    const { user, handleSignOut } = useAuth();
    const { data } = useCart();
    const da = Object.keys(data);
    const [admin, setAdmin] = React.useState(false);

    React.useEffect(() => {
        setAdmin(false);
        if (user.email) {
            fetch(
                `https://mighty-thicket-60343.herokuapp.com/users/${user.email}`
            )
                .then((res) => res.json())
                .then((user) => {
                    console.log(user.role);
                    if (user?.role === "admin" || user?.role === "chef")
                        setAdmin(true);
                });
        }
    }, [user.email]);

    return (
        <Appbar style={styles.bottom}>
            <Link to="/">
                <Appbar.Action
                    icon="home"
                    color="blueviolet"
                    style={{ backgroundColor: "white" }}
                />
            </Link>
            <Link to="/menu">
                <Appbar.Action
                    icon="food"
                    color="blueviolet"
                    style={{ backgroundColor: "white" }}
                />
            </Link>
            <Link to="/orders">
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Appbar.Action
                        icon="cart"
                        color="blueviolet"
                        style={{ backgroundColor: "white" }}
                    />
                    <Badge
                        size={20}
                        style={{
                            marginVertical: 5,
                            marginLeft: -15,
                            backgroundColor: "blueviolet",
                        }}
                    >
                        {da.length}
                    </Badge>
                </View>
            </Link>
            {user.email && (
                <Link to="/trackMyOrders">
                    <Appbar.Action
                        icon="food-fork-drink"
                        color="blueviolet"
                        style={{ backgroundColor: "white" }}
                    />
                </Link>
            )}
            {admin && (
                <Link to="/allOrders">
                    <Appbar.Action
                        icon="chef-hat"
                        color="blueviolet"
                        style={{ backgroundColor: "white" }}
                    />
                </Link>
            )}
            {user.email ? (
                <Appbar.Action
                    icon="logout"
                    color="blueviolet"
                    onPress={handleSignOut}
                    style={{ backgroundColor: "white" }}
                />
            ) : (
                <Link to="/login">
                    <Appbar.Action
                        icon="account"
                        color="blueviolet"
                        style={{ backgroundColor: "white" }}
                    />
                </Link>
            )}
        </Appbar>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    bottom: {
        // position: "absolute",
        backgroundColor: "#dcd7e4",
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
    },
});
