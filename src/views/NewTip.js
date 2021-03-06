import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";

import * as UsersAction from "../services/actions/usersAction";
import * as TipAction from "../services/actions/tipAction";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "../Styles/main";

export default function NewTip({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const login = useSelector((store) => store.login);
    const users = useSelector((store) => store.users);
    const [tip, setTip] = useState(
        route.params.tip ? route.params.tip.tip : ""
    );
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        dispatch(UsersAction.getAll());
    }, [dispatch]);

    async function sendTip() {
        let currentUser;
        let newTip;

        setLoading(true);

        users.forEach((user) => {
            if (user.email == login.email) {
                currentUser = user;
            }
        });

        if (route.params.tip) {
            newTip = {
                userId: currentUser.id,
                gameId: game.id,
                tip,
                id: route.params.tip.id,
            };
        } else {
            newTip = {
                userId: currentUser.id,
                gameId: game.id,
                tip,
            };
        }

        try {
            await dispatch(TipAction.save(newTip));

            navigation.goBack();
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <TextInput
                    value={tip}
                    style={mainStyle.normalInput}
                    onChangeText={(text) => setTip(text)}
                    placeholder={`Dica para ${game.name}`}
                />
                <Button
                    title="Enviar Dica"
                    buttonStyle={mainStyle.normalButton}
                    onPress={() => sendTip()}
                    loading={loading}
                    disabled={tip.length > 0 ? false : true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
