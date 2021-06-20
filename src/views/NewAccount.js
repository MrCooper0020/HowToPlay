import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

import * as LoginAction from "../services/actions/loginAction";
import * as UserAction from "../services/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "../Styles/main";

export default function NewAccount({ route, navigation }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function CreateUser() {
        setLoading(true);

        try {
            await dispatch(LoginAction.createAccount(email, password));
            await dispatch(
                UserAction.save({
                    name,
                    email,
                })
            );

            navigation.navigate("Home");
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text>Nome:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text>Email:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text>Senha:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button
                    title="Criar"
                    buttonStyle={mainStyle.greenButton}
                    loading={loading}
                    onPress={() => CreateUser()}
                    disabled={
                        name.length > 0 &&
                        email.length > 0 &&
                        password.length > 0
                            ? false
                            : true
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
});
