import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as UsersAction from "../services/actions/usersAction";
import * as GameAction from "../services/actions/gameAction";
import * as CommentsAction from "../services/actions/commentsAction";
import * as CommentAction from "../services/actions/commentAction";
import { useSelector, useDispatch } from "react-redux";

export default function GamePage({ route, navigation }) {
    const dispatch = useDispatch();
    const allComments = useSelector((store) => store.comments);
    const login = useSelector((store) => store.login);
    const users = useSelector((store) => store.users);
    const { game } = route.params;
    const [isCreator, setIsCreator] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useLayoutEffect(() => {
        async function loadData() {
            try {
                await dispatch(CommentsAction.getAll());
                await dispatch(UsersAction.getAll());
            } catch (error) {}
        }
        loadData();

        if (login.email) {
            users.forEach((user) => {
                if (login.email == user.email) {
                    setIsCreator(true);
                }
            });
        }
    }, [dispatch]);

    async function deleteGame() {
        setLoadingDelete(true);

        try {
            await dispatch(GameAction.remove(game.id));

            allComments.forEach((comment) => {
                if (game.id == comment.gameId) {
                    dispatch(CommentAction.remove(comment.id));
                }
            });

            // to do: remove tips about this game.

            navigation.navigate("Home");
        } catch (error) {
            setLoadingDelete(false);
            console.log(error);
        }
    }

    return (
        <View>
            <StatusBar style="auto" />
            <View style={styles.banner}>
                <Text style={styles.nameBanner}>{game.name}</Text>
            </View>
            <View style={styles.body}>
                <Text>Descricao do jogo: {game.description}</Text>
                <Text>Desenvolvedora: {game.developer}</Text>
                <Text>Data de lancamento: {game.releaseDate}</Text>
            </View>
            <View>
                {isCreator ? (
                    <>
                        <Button
                            title="Editar jogo"
                            loading={loadingDelete}
                            onPress={() =>
                                navigation.navigate("RegisterGame", { game })
                            }
                        />
                        <Button
                            title="Deletar jogo"
                            buttonStyle={{ backgroundColor: "red" }}
                            loading={loadingDelete}
                            onPress={() => deleteGame()}
                        />
                    </>
                ) : null}
                <Button
                    title="Sala de dicas"
                    disabled={!login.email ? true : false}
                    onPress={() => navigation.navigate("TipsRoom", { game })}
                />
            </View>
            <View>
                <Text>Comentarios sobre o jogo:</Text>
                <Button
                    title="Comentar"
                    disabled={!login.email > 0 ? true : false}
                    onPress={() => navigation.navigate("NewComment", { game })}
                />
                {allComments.map((comment, index) => {
                    if (game.id == comment.gameId) {
                        let currentUser;

                        users.forEach((user) => {
                            if (user.id == comment.userId) {
                                currentUser = user;
                            }
                        });

                        return (
                            <Card key={index}>
                                <Card.Title>{currentUser.name}</Card.Title>
                                <Card.Divider />
                                <Text>{comment.comment}</Text>
                            </Card>
                        );
                    }
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "green",
        height: 150,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    nameBanner: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    body: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});
