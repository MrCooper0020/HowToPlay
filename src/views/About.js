import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function About() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ScrollView>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Nome: </Text>
                        Matheus H. Potrich
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Cursando: </Text>
                        Ciências da Computação (5º semestre)
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Instituição:{" "}
                        </Text>
                        IMED
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Email: </Text>
                        matheushp.com@gmail.com
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>RA: </Text>
                        1117956
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginHorizontal: 20,
    },
    infoBox: {
        marginBottom: 20,
    },
});
