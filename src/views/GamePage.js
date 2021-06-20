import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
} from "react-native";
import { Card, ListItem, Button, Icon, Text } from "react-native-elements";
import * as UsersAction from "../services/actions/usersAction";
import * as GameAction from "../services/actions/gameAction";
import * as CommentsAction from "../services/actions/commentsAction";
import * as CommentAction from "../services/actions/commentAction";
import * as TipsAction from "../services/actions/tipsAction";
import * as TipAction from "../services/actions/tipAction";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "../Styles/main";

export default function GamePage({ route, navigation }) {
    const dispatch = useDispatch();
    const allComments = useSelector((store) => store.comments);
    const login = useSelector((store) => store.login);
    const users = useSelector((store) => store.users);
    const tips = useSelector((store) => store.tips);
    const { game } = route.params;
    const [currentUser, setCurrentUser] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useLayoutEffect(() => {
        async function loadData() {
            try {
                await dispatch(CommentsAction.getAll());
                await dispatch(UsersAction.getAll());
                await dispatch(TipsAction.getAll());

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

    async function deleteGame() {
        setLoadingDelete(true);

        try {
            await dispatch(GameAction.remove(game.id));

            allComments.forEach((comment) => {
                if (game.id == comment.gameId) {
                    dispatch(CommentAction.remove(comment.id));
                }
            });

            tips.forEach((tip) => {
                if (game.id == tip.gameId) {
                    dispatch(TipAction.remove(tip.id));
                }
            });

            navigation.navigate("Home");
        } catch (error) {
            setLoadingDelete(false);
            console.log(error);
        }
    }

    async function deleteComment(commentId) {
        try {
            await dispatch(CommentAction.remove(commentId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ScrollView>
                    <View style={styles.banner}>
                        <ImageBackground
                            source={require("../Images/gameBanner.png")}
                            blurRadius={Platform.OS == "ios" ? 10 : 5}
                            style={styles.image}
                        >
                            <Text style={styles.nameBanner}>{game.name}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.infoGame}>
                            <Text h4>Descrição do jogo: </Text>
                            <Text h5>{game.description}</Text>
                        </Text>
                        <Text style={styles.infoGame}>
                            <Text h4>Desenvolvedora: </Text>
                            <Text h5>{game.developer}</Text>
                        </Text>
                        <Text style={styles.infoGame}>
                            <Text h4>Data de lançamento: </Text>
                            <Text h5>{game.releaseDate}</Text>
                        </Text>
                    </View>
                    <View style={styles.adminBody}>
                        {game.creatorId == currentUser.id ? (
                            <>
                                <Button
                                    title="Editar jogo"
                                    buttonStyle={mainStyle.yellowButton}
                                    onPress={() =>
                                        navigation.navigate("RegisterGame", {
                                            game,
                                        })
                                    }
                                />
                                <Button
                                    title="Deletar jogo"
                                    buttonStyle={mainStyle.redButton}
                                    loading={loadingDelete}
                                    onPress={() => deleteGame()}
                                />
                            </>
                        ) : null}
                        <Button
                            title="Sala de dicas"
                            buttonStyle={mainStyle.normalButton}
                            disabled={!login.email ? true : false}
                            onPress={() =>
                                navigation.navigate("TipsRoom", { game })
                            }
                        />
                    </View>
                    <View style={styles.adminBody}>
                        <Card.Divider />
                        <Text h4 style={styles.subtitle}>
                            Comentários sobre o jogo:
                        </Text>
                        <Button
                            title="Comentar"
                            disabled={!login.email > 0 ? true : false}
                            buttonStyle={mainStyle.normalButton}
                            onPress={() =>
                                navigation.navigate("NewComment", { game })
                            }
                        />
                        {allComments.map((comment, index) => {
                            if (game.id == comment.gameId) {
                                let commentCreator;

                                users.forEach((user) => {
                                    if (user.id == comment.userId) {
                                        commentCreator = user;
                                    }
                                });

                                return (
                                    <Card
                                        key={index}
                                        containerStyle={{
                                            marginHorizontal: 0,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Card.Title>
                                            {commentCreator.name}
                                        </Card.Title>
                                        <Card.Divider />
                                        <Text
                                            style={{
                                                marginBottom: 15,
                                                marginHorizontal: 10,
                                            }}
                                        >
                                            {comment.comment}
                                        </Text>
                                        {commentCreator.id == currentUser.id ? (
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
                                                                "NewComment",
                                                                {
                                                                    game,
                                                                    comment,
                                                                }
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        title="Apagar"
                                                        containerStyle={{
                                                            width: "40%",
                                                        }}
                                                        buttonStyle={
                                                            styles.commentButtonDelete
                                                        }
                                                        onPress={() =>
                                                            deleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                    />
                                                </View>
                                            </>
                                        ) : null}
                                    </Card>
                                );
                            }
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "gray",
        height: 150,
        width: "100%",
        marginBottom: 10,
    },
    nameBanner: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 2,
        shadowRadius: 5,
    },
    body: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    infoGame: {
        marginTop: 10,
    },
    adminBody: {
        paddingHorizontal: 20,
    },
    subtitle: {
        marginBottom: 10,
    },
    commentButtonEdit: {
        padding: 5,
        backgroundColor: "orange",
    },
    commentButtonDelete: {
        padding: 5,
        backgroundColor: "red",
    },
    image: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
