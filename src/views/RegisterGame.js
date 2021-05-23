import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import * as DataService from "../services/DataService";

export default function RegisterGame({ route, navigation }) {
    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [description, setDescription] = useState("");
    const [developer, setDeveloper] = useState("");
    const [loading, setLoading] = useState(false);

    function uploadData() {
        setLoading(true);

        DataService.addData("Games", {
            name,
            releaseDate,
            description,
            developer,
        }).then(() => {
            navigation.navigate("Home");
        });
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
