import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as DataService from "../services/DataService";

export default function Home() {
    const [games, setGames] = useState([]);

    useLayoutEffect(() => {
        DataService.getData("games").then((data) => {
            setGames(data);
            console.log("Home:", data);
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {games.map((item, i) => {
                return <Text key={i}>{item.name}</Text>;
            })}
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
