import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TipsRoom() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Sala de dicas</Text>
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
