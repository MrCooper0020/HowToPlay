import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

import * as GameAction from "../services/actions/gameAction";
import * as UsersAction from "../services/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "../Styles/main";

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
                    style={mainStyle.normalInput}
                    placeholder="Nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text>Data de lançamento:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="dd/mm/yyyy"
                    keyboardType="numeric"
                    maxLength={8}
                    value={releaseDate}
                    onChangeText={(text) => setReleaseDate(text)}
                />
                <Text>Descrição:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="Descricao"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <Text>Desenvolvedor:</Text>
                <TextInput
                    style={mainStyle.normalInput}
                    placeholder="Desenvolvedor"
                    value={developer}
                    under
                    onChangeText={(text) => setDeveloper(text)}
                />
                <Button
                    title="Adicionar"
                    buttonStyle={mainStyle.greenButton}
                    loading={loading}
                    disabled={
                        name.length > 0 &&
                        releaseDate.length > 0 &&
                        developer.length > 0 &&
                        description.length > 0
                            ? false
                            : true
                    }
                    onPress={() => uploadData()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
});
