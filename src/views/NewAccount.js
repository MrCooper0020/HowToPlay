import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import * as LoginAction from "../services/actions/loginAction";
import * as UserAction from "../services/actions/userAction";
import { useSelector, useDispatch } from "react-redux";

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
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text>Email:</Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text>Senha:</Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button
                    title="Criar"
                    buttonStyle={{
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 15,
                    }}
                    loading={loading}
                    onPress={() => CreateUser()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
