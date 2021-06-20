import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function HowWasMade() {
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
                    <View style={{ alignItems: "center" }}>
                        <Text h3 style={styles.title}>
                            Expo ou CLI?
                        </Text>
                    </View>
                    <Text h4 style={styles.infoBox}>
                        Foi utilizado nesse projeto o Expo, pois
                        eu(desenvolvedor) uso um Iphone e uso um computador com
                        Windows, e utilizando o Expo é umas das únicas maneira
                        de desenvolver sem ter um computador com MacOS, outro
                        motivo foi a facilidade de iniciar um projeto e utilizar
                        recursos sem a necessidade de configurações complexas
                        como vincular as bibliotecas com o projeto.
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
    title: {
        marginBottom: 30,
        fontWeight: "bold",
        alignItems: "center",
    },
});
