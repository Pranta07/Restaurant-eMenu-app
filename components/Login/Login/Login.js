import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-native";
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import { TextInput } from "react-native-paper";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({});
    const { handleSignIn, handleRegister } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleSignIn(loginInfo.email, loginInfo.password, location, navigate);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        handleRegister(loginInfo.email, loginInfo.password, navigate);
    };

    /* const handleChange = (e) => {
        const newInfo = { ...loginInfo };
        const name = e.target.name;
        newInfo[name] = e.target.value;
        setLoginInfo(newInfo);
        // console.log(name, newInfo);
    }; */

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={loginInfo.email}
                    onChangeText={(text) => {
                        const newInfo = { ...loginInfo };
                        newInfo.email = text;
                        setLoginInfo(newInfo);
                    }}
                    style={styles.input}
                    mode="outlined"
                    label="Email"
                />
                <TextInput
                    placeholder="Password"
                    value={loginInfo.password}
                    onChangeText={(text) => {
                        const newInfo = { ...loginInfo };
                        newInfo.password = text;
                        setLoginInfo(newInfo);
                    }}
                    style={styles.input}
                    secureTextEntry
                    mode="outlined"
                    label="Password"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLoginSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleRegisterSubmit}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
});