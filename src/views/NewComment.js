import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as GameAction from "../services/actions/gameAction";
import { useSelector, useDispatch } from "react-redux";

export default function NewComment({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendComment() {
        setLoading(true);
        let allComments = game.comments ? game.comments : [];
        allComments.push(comment);

        console.log(allComments);

        try {
            await dispatch(
                GameAction.save({
                    id: game.id,
                    name: game.name,
                    releaseDate: game.releaseDate,
                    description: game.description,
                    developer: game.developer,
                    comments: allComments,
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
