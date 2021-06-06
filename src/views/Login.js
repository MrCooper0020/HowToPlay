import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LoginAction from "../services/actions/loginAction";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
