import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as CommentAction from "../services/actions/commentAction";
import { useSelector, useDispatch } from "react-redux";

export default function NewComment({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendComment() {
        setLoading(true);

        try {
            await dispatch(
                CommentAction.save({
                    userId: 0,
                    gameId: game.id,
                    comment: comment,
                })
            );

            navigation.goBack();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Input
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    placeholder={`Comentario para ${game.name}`}
                />
                <Button
                    title="Enviar Comentario"
                    onPress={() => sendComment()}
                    loading={loading}
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
