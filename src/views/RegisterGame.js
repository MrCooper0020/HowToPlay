import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import * as GameAction from "../services/actions/gameAction";
import { useSelector, useDispatch } from "react-redux";

export default function RegisterGame({ route, navigation }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [description, setDescription] = useState("");
    const [developer, setDeveloper] = useState("");
    const [loading, setLoading] = useState(false);

    async function uploadData() {
        setLoading(true);

        try {
            await dispatch(
                GameAction.save({
                    name,
                    releaseDate,
                    description,
                    developer,
                    comments: [],
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
                        borderColor: "Gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text>Data de lancamento:</Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "Gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Data de lancamento"
                    keyboardType="numeric"
                    value={releaseDate}
                    onChangeText={(text) => setReleaseDate(text)}
                />
                <Text>Descricao (opicional):</Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "Gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Descricao"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <Text>Desenvolvedor:</Text>
                <TextInput
                    style={{
                        width: "100%",
                        padding: 10,
                        borderColor: "Gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Desenvolvedor"
                    value={developer}
                    onChangeText={(text) => setDeveloper(text)}
                />
                <Button
                    title="Adicionar"
                    buttonStyle={{
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 15,
                    }}
                    loading={loading}
                    onPress={() => uploadData()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
