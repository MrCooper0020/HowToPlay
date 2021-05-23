import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CardItem(props) {
    return (
        <View style={styles.cardBody}>
            {props.image ? (
                <Image source={props.image} style={styles.cardImage}></Image>
            ) : (
                <Text style={styles.cardTitle}>{props.title}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardBody: {
        borderRadius: 40,
        height: 180,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        backgroundColor: "white",
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
