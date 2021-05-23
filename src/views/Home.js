import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
} from "react-native";

import * as DataService from "../services/DataService";
import CardItem from "../Components/CardItem";

export default function Home() {
    const [games, setGames] = useState([]);

    useLayoutEffect(() => {
        DataService.getData("games").then((data) => {
            setGames(data);
            console.log("Home:", data);
        });
    }, []);

    const image = {
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.toucharcade.com%2Fwp-content%2Fuploads%2F2013%2F12%2FGTA_SA1.jpg&f=1&nofb=1",
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <View>
                        <CardItem title="Adicionar jogo" />
                        {games.map((item, i) => {
                            return <CardItem key={i} title={item.name} />;
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
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
