import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";

const Navigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "menu", title: "Menu", icon: "menu" },
        { key: "home", title: "Home", icon: "home" },
        { key: "orders", title: "Orders", icon: "cart" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        menu: Menu,
        orders: Menu,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Navigation;
