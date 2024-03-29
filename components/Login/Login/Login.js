import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-native";
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import {
    Avatar,
    Colors,
    IconButton,
    Snackbar,
    TextInput,
} from "react-native-paper";

const Login = () => {
    const [visible, setVisible] = useState(true);
    const [loginInfo, setLoginInfo] = useState({});
    const { handleSignIn, handleRegister, handleGoogleSignIn, error } =
        useAuth();

    const onDismissSnackBar = () => setVisible(false);

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleSignIn(loginInfo.email, loginInfo.password, navigate);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        handleRegister(loginInfo.email, loginInfo.password, navigate);
    };

    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        handleGoogleSignIn(navigate);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ marginHorizontal: "auto", marginVertical: 15 }}>
                <Avatar.Icon size={80} icon="account-circle" />
            </View>
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
                <Text style={[styles.buttonOutlineText, styles.text]}>
                    --------Or Sign In with--------
                </Text>
                <TouchableOpacity
                    // onPress={handleLoginWithGoogle}
                    style={[styles.button, styles.buttonOutline, styles.google]}
                >
                    <IconButton
                        icon="google"
                        color={Colors.blue600}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                    <Text style={styles.buttonOutlineText}>Google Sign In</Text>
                </TouchableOpacity>
                {error.length > 0 && (
                    <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: "Hide",
                        }}
                    >
                        {error}
                    </Snackbar>
                )}
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
        marginTop: 30,
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
    google: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        marginVertical: 10,
    },
});
