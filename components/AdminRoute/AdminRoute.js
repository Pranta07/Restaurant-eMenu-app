import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    const [done, setDone] = React.useState(false);

    const { user } = useAuth();

    useEffect(() => {
        setDone(false);
        fetch(`https://mighty-thicket-60343.herokuapp.com/users/${user.email}`)
            .then((res) => res.json())
            .then((user) => {
                // console.log(user.role);
                if (user.role === "admin" || user.role === "chef")
                    setAdmin(true);
            })
            .finally(() => setDone(true));
    }, [user.email]);

    if (!done) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator animating={true} color={Colors.blue800} />
            </View>
        );
    } else {
        return user.email && admin ? (
            children
        ) : (
            <Navigate to="/login" replace={true} />
        );
    }
};

export default AdminRoute;
