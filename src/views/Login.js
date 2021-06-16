import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LoginAction from "../services/actions/loginAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, CheckBox } from "react-native-elements";

export default function Login({ route, navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);

    useLayoutEffect(() => {
        async function verifyStorage() {
            let emailStorage = await AsyncStorage.getItem("email");
            let passwordStorage = await AsyncStorage.getItem("password");

            if (emailStorage) {
                setEmail(emailStorage);
                setRemember(true);
            }
            if (passwordStorage) setPassword(passwordStorage);
        }
        verifyStorage();
    }, []);

    const login = async () => {
        setLoading(true);

        try {
            await dispatch(LoginAction.login(email, password, remember));
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
                <View>
                    <CheckBox
                        title="lembrar-me"
                        center
                        checked={remember}
                        onPress={() => setRemember(!remember)}
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 0,
                        }}
                    />
                </View>
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
    containerSwitch: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});
