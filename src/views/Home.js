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
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <View>
                        <CardItem
                            title="Minha Localizacão"
                            image={require("../Images/mapsImage.jpg")}
                            showBackground={true}
                            onPress={() => {
                                navigation.navigate("Maps");
                            }}
                        />
                        <CardItem
                            title="Expo ou CLI?"
                            image={require("../Images/infoImage.jpg")}
                            onPress={() => {
                                navigation.navigate("HowWasMade");
                            }}
                        />
                        <CardItem
                            title="Arquitetura"
                            image={require("../Images/infoImage.jpg")}
                            onPress={() => {
                                navigation.navigate("Architecture");
                            }}
                        />
                        <CardItem
                            title="FAQ"
                            image={require("../Images/infoImage.jpg")}
                            onPress={() => {
                                navigation.navigate("Faq");
                            }}
                        />
                        {login.email ? (
                            <CardItem
                                title="Adicionar jogo"
                                onPress={() => {
                                    navigation.navigate("RegisterGame");
                                }}
                            />
                        ) : null}
                        {games.length == 0 ? (
                            <View style={styles.messageContainer}>
                                <Text>Nenhum jogo cadastrado!</Text>
                            </View>
                        ) : (
                            games.map((item, i) => {
                                return (
                                    <CardItem
                                        key={i}
                                        title={item.name}
                                        image={require("../Images/gameBanner.png")}
                                        onPress={() =>
                                            navigation.navigate("GamePage", {
                                                game: item,
                                            })
                                        }
                                    />
                                );
                            })
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    messageContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});
