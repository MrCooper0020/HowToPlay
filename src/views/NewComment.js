import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

import * as UsersAction from "../services/actions/usersAction";
import * as CommentAction from "../services/actions/commentAction";
import { useSelector, useDispatch } from "react-redux";

export default function NewComment({ route, navigation }) {
    const dispatch = useDispatch();
    const { game } = route.params;
    const login = useSelector((store) => store.login);
    const users = useSelector((store) => store.users);
    const [comment, setComment] = useState(
        route.params.comment ? route.params.comment.comment : ""
    );
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        dispatch(UsersAction.getAll());
    }, [dispatch]);

    async function sendComment() {
        let currentUser;
        let newComment;

        setLoading(true);

        users.forEach((user) => {
            if (user.email == login.email) {
                currentUser = user;
            }
        });

        if (route.params.comment) {
            newComment = {
                userId: currentUser.id,
                gameId: game.id,
                comment: comment,
                id: route.params.comment.id,
            };
        } else {
            newComment = {
                userId: currentUser.id,
                gameId: game.id,
                comment: comment,
            };
        }

        try {
            await dispatch(CommentAction.save(newComment));

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
