import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

import * as TipsAction from "../services/actions/tipsAction";
import * as TipAction from "../services/actions/tipAction";
import * as UsersAction from "../services/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";

export default function TipsRoom({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const tips = useSelector((store) => store.tips);
    const users = useSelector((store) => store.users);

    useLayoutEffect(() => {
        dispatch(TipsAction.getAll());
        dispatch(UsersAction.getAll());
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
            <Button
                title="Adicionar nova dica"
                onPress={() => navigation.navigate("NewTip", { game })}
            />
            {tips.map((tip, i) => {
                if (game.id == tip.gameId) {
                    let currentUser;

                    users.forEach((user) => {
                        if (user.id == tip.userId) {
                            currentUser = user;
                        }
                    });

                    return (
                        <Card key={i}>
                            <Card.Title>{currentUser.name}</Card.Title>
                            <Card.Divider />
                            <Text>{tip.tip}</Text>
                            <Card.Divider />
                            <View>
                                <Button
                                    title="Editar"
                                    onPress={() =>
                                        navigation.navigate("NewTip", {
                                            game,
                                            tip,
                                        })
                                    }
                                />
                                <Button
                                    title="Apagar"
                                    onPress={() => deleteTip(tip.id)}
                                />
                            </View>
                        </Card>
                    );
                }
            })}
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
