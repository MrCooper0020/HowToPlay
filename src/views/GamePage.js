import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as CommentsAction from "../services/actions/commentsAction";
import { useSelector, useDispatch } from "react-redux";

export default function GamePage({ route, navigation }) {
    const dispatch = useDispatch();
    const allComments = useSelector((store) => store.comments);
    const { game } = route.params;
    const [comments, setComments] = useState([]);

    useLayoutEffect(() => {
        async function loadData() {
            try {
                await dispatch(CommentsAction.getAll());
            } catch (error) {}
        }
        loadData();
    }, [dispatch]);

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
                <Button
                    title="Sala de dicas"
                    onPress={() => navigation.navigate("TipsRoom", { game })}
                />
            </View>
            <View>
                <Text>Comentarios sobre o jogo:</Text>
                <Button
                    title="Comentar"
                    onPress={() => navigation.navigate("NewComment", { game })}
                />
                {allComments.map((comment, index) => {
                    if (game.id == comment.gameId) {
                        return (
                            <Card key={index}>
                                <Card.Title>Joao</Card.Title>
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
