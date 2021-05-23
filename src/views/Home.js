import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

export default function Home({ route, navigation }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({ name: "Matheus" });

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            refresh();

            // attention needed
            navigation.setOptions({
                headerRight: () => (
                    <Button
                        onPress={() =>
                            login
                                ? setLogin(false)
                                : navigation.navigate("Login")
                        }
                        title={login ? "Sair" : "Entrar"}
                        type="clear"
                    />
                ),
            });
        });
        return unsubscribe;
    }, [navigation]);

    function refresh() {
        setLoading(true);
        DataService.getData("games").then((data) => {
            setGames(data);
            setLoading(false);
        });
    }

    const image = {
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.toucharcade.com%2Fwp-content%2Fuploads%2F2013%2F12%2FGTA_SA1.jpg&f=1&nofb=1",
    };

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
                                return <CardItem key={i} title={item.name} />;
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
