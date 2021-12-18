import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./components/Navigation/Navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import { NativeRouter, Routes, Route } from "react-router-native";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import MyOrders from "./components/MyOrders/MyOrders";
import Login from "./components/Login/Login/Login";
import ItemDetails from "./components/ItemDetails/ItemDetails";

export default function App() {
    return (
        <AuthProvider>
            <PaperProvider style={styles.container}>
                <NativeRouter>
                    <Navigation></Navigation>
                    <Routes>
                        <Route index path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/details/:id" element={<ItemDetails />} />
                        <Route path="/orders" element={<MyOrders />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </NativeRouter>
            </PaperProvider>
        </AuthProvider>
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
