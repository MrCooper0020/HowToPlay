import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

import * as TipsAction from "../services/actions/tipsAction";
import * as TipAction from "../services/actions/tipAction";
import * as UsersAction from "../services/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "../Styles/main";

export default function TipsRoom({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const login = useSelector((store) => store.login);
    const tips = useSelector((store) => store.tips);
    const users = useSelector((store) => store.users);
    const [currentUser, setCurrentUser] = useState(false);

    useLayoutEffect(() => {
        async function loadData() {
            try {
                await dispatch(TipsAction.getAll());
                await dispatch(UsersAction.getAll());

                // save the id of current user
                if (login.email) {
                    users.forEach((user) => {
                        if (login.email == user.email) {
                            setCurrentUser(user);
                        }
                    });
                }
            } catch (error) {}
        }
        loadData();
    }, [dispatch]);

    async function deleteTip(tipId) {
        try {
            await dispatch(TipAction.remove(tipId));
        } catch (error) {
            console.log(error);
        }
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
                <ScrollView style={{ paddingTop: 20 }}>
                    <Button
                        title="Adicionar nova dica"
                        buttonStyle={mainStyle.normalButton}
                        onPress={() => navigation.navigate("NewTip", { game })}
                    />
                    {tips.map((tip, i) => {
                        if (game.id == tip.gameId) {
                            let tipCreator;

                            console.log(currentUser);

                            users.forEach((user) => {
                                if (user.id == tip.userId) {
                                    tipCreator = user;
                                }
                            });

                            return (
                                <Card
                                    key={i}
                                    containerStyle={{
                                        marginHorizontal: 0,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Card.Title>{tipCreator.name}</Card.Title>
                                    <Card.Divider />
                                    <Text
                                        style={{
                                            marginBottom: 15,
                                            marginHorizontal: 10,
                                        }}
                                    >
                                        {tip.tip}
                                    </Text>
                                    {currentUser.id == tip.userId ? (
                                        <>
                                            <Card.Divider />
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-around",
                                                    width: "100%",
                                                }}
                                            >
                                                <Button
                                                    title="Editar"
                                                    buttonStyle={
                                                        styles.commentButtonEdit
                                                    }
                                                    containerStyle={{
                                                        width: "40%",
                                                    }}
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "NewTip",
                                                            {
                                                                game,
                                                                tip,
                                                            }
                                                        )
                                                    }
                                                />
                                                <Button
                                                    title="Apagar"
                                                    buttonStyle={
                                                        styles.commentButtonDelete
                                                    }
                                                    containerStyle={{
                                                        width: "40%",
                                                    }}
                                                    onPress={() =>
                                                        deleteTip(tip.id)
                                                    }
                                                />
                                            </View>
                                        </>
                                    ) : null}
                                </Card>
                            );
                        }
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    commentButtonEdit: {
        padding: 5,
        backgroundColor: "orange",
    },
    commentButtonDelete: {
        padding: 5,
        backgroundColor: "red",
    },
});
