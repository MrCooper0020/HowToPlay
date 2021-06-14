import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LoginAction from "../services/actions/loginAction";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "react-native-elements";

export default function Login({ route, navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            await dispatch(LoginAction.login(email, password));
            navigation.replace("Home");
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.loginBody}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Button
                    title="Entrar"
                    loading={loading}
                    onPress={() => login()}
                />
                <Button
                    title="Criar conta"
                    type="clear"
                    onPress={() => navigation.navigate("NewAccount")}
                />
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
        width: "70%",
    },
});
