import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LoginAction from "../services/actions/loginAction";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "react-native-elements";

export default function Login() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.loginBody}>
                <Input placeholder="Email" />
                <Input placeholder="Senha" />
                <Button title="Entrar" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loginBody: {
        width: "60%",
    },
});
