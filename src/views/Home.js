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

import * as DataService from "../services/DataService";
import CardItem from "../Components/CardItem";
import * as GamesAction from "../services/actions/gamesAction";
import { useSelector, useDispatch } from "react-redux";

export default function Home({ route, navigation }) {
    const dispatch = useDispatch();
    const games = useSelector((store) => store.games);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        dispatch(GamesAction.getAll());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <SafeAreaView
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <View>
                            <CardItem
                                title="Adicionar jogo"
                                onPress={() => {
                                    navigation.navigate("RegisterGame");
                                }}
                            />
                            {games.map((item, i) => {
                                return (
                                    <CardItem
                                        key={i}
                                        title={item.name}
                                        onPress={() =>
                                            navigation.navigate("GamePage", {
                                                game: item,
                                            })
                                        }
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
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
