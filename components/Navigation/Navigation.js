import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
    /* const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "menu", title: "Menu", icon: "menu" },
        { key: "home", title: "Home", icon: "home" },
        { key: "orders", title: "Orders", icon: "cart" },
        { key: "login", title: "Login", icon: "account" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        menu: Menu,
        orders: MyOrders,
        login: Login,
    }); */

    const { user, handleSignOut } = useAuth();

    return (
        /* <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
        /> */
        <Appbar style={styles.bottom}>
            <Link to="/">
                <Appbar.Action icon="home" />
            </Link>
            <Link to="/menu">
                <Appbar.Action icon="food" />
            </Link>
            <Link to="/orders">
                <Appbar.Action icon="cart" />
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
