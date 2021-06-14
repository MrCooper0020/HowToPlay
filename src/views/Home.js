import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import CardItem from "../Components/CardItem";
import * as UsersAction from "../services/actions/usersAction";
import * as LoginAction from "../services/actions/loginAction";
import * as GamesAction from "../services/actions/gamesAction";
import { useSelector, useDispatch } from "react-redux";

export default function Home({ route, navigation }) {
    const dispatch = useDispatch();
    const login = useSelector((store) => store.login);
    const games = useSelector((store) => store.games);

    useLayoutEffect(() => {
        dispatch(GamesAction.getAll());
        dispatch(UsersAction.getAll());

        navigation.setOptions({
            headerRight: () => {
                if (login.email) {
                    return (
                        <Button
                            title="Sair"
                            type="clear"
                            onPress={() => logout()}
                        />
                    );
                } else {
                    return (
                        <Button
                            onPress={() => navigation.navigate("Login")}
                            title="Entrar"
                            type="clear"
                        />
                    );
                }
            },
        });
    }, [dispatch, navigation]);

    async function logout() {
        await dispatch(LoginAction.signOut());
        navigation.navigate("home");
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {games.length == 0 ? (
                <Text>Nenhum jogo cadastrado!</Text>
            ) : (
                <SafeAreaView
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <View>
                            {login.email ? (
                                <CardItem
                                    title="Adicionar jogo"
                                    onPress={() => {
                                        navigation.navigate("RegisterGame");
                                    }}
                                />
                            ) : null}

                            {games.map((item, i) => {
                                return (
                                    <CardItem
                                        key={i}
                                        title={item.name}
                                        onPress={() =>
                                            navigation.navigate("GamePage", {
                                                game: item,
                                            })
                                        }
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
