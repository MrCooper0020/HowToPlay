import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import * as LoginAction from "../services/actions/loginAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { Button, CheckBox, Text } from "react-native-elements";
import mainStyle from "../Styles/main";

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
            <View style={styles.containerTitle}>
                <Text h1 style={styles.title}>
                    How to Play
                </Text>
            </View>
            <View style={styles.loginBody}>
                <TextInput
                    placeholder="Email"
                    style={mainStyle.normalInput}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Senha"
                    style={mainStyle.normalInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <View>
                    <CheckBox
                        title="Lembre-me"
                        center
                        checked={remember}
                        onPress={() => setRemember(!remember)}
                        checkedColor={"green"}
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 0,
                        }}
                    />
                </View>
                <Button
                    title="Entrar"
                    buttonStyle={mainStyle.greenButton}
                    loading={loading}
                    onPress={() => login()}
                    disabled={
                        email.length > 0 && password.length > 0 ? false : true
                    }
                />
                <Button
                    title="Criar conta"
                    type="clear"
                    titleStyle={{ color: "green" }}
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
        marginBottom: 100,
    },
    containerSwitch: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    title: {
        fontWeight: "bold",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: "grey",
    },
    containerTitle: {
        alignItems: "center",
        marginBottom: 20,
        height: 100,
    },
});
