import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import * as GameAction from "../services/actions/gameAction";
import * as UsersAction from "../services/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";

export default function RegisterGame({ route, navigation }) {
    const dispatch = useDispatch();
    const params = route.params;
    const login = useSelector((store) => store.login);
    const users = useSelector((store) => store.users);
    const [name, setName] = useState(params ? params.game.name : "");
    const [releaseDate, setReleaseDate] = useState(
        params ? params.game.releaseDate : ""
    );
    const [description, setDescription] = useState(
        params ? params.game.description : ""
    );
    const [developer, setDeveloper] = useState(
        params ? params.game.developer : ""
    );
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        dispatch(UsersAction.getAll());
    }, [dispatch]);

    async function uploadData() {
        let currentGame;
        let currentUser;

        setLoading(true);

        users.forEach((user) => {
            if (user.email == login.email) {
                currentUser = user;
            }
        });

        if (params) {
            currentGame = {
                id: params.game.id,
                name,
                releaseDate,
                description,
                developer,
                creatorId: currentUser.id,
            };
        } else {
            currentGame = {
                name,
                releaseDate,
                description,
                developer,
                creatorId: currentUser.id,
            };
        }

        try {
            await dispatch(GameAction.save(currentGame));
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
                <Text>Data de lancamento:</Text>
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
                        borderColor: "gray",
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
                        borderColor: "gray",
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
