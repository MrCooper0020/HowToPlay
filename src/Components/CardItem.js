import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function CardItem(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.cardBody}>
                {props.image ? (
                    <>
                        <Image
                            source={props.image}
                            style={styles.cardImage}
                            blurRadius={Platform.OS == "ios" ? 10 : 5}
                        />
                        <Text style={styles.cardTitleImage}>{props.title}</Text>
                    </>
                ) : (
                    <Text style={styles.cardTitle}>{props.title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardBody: {
        borderRadius: 40,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        backgroundColor: "white",
    },
    cardImage: {
        height: "100%",
        width: "100%",
        position: "absolute",
        borderRadius: 40,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    cardTitleImage: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
});
