import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function Architecture() {
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
                            Arquitetura do Projeto
                        </Text>
                    </View>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta views:{" "}
                        </Text>
                        Onde fica todas as views(telas) do projeto.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta styles:{" "}
                        </Text>
                        Onde fica todos os estilos globais do projeto.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta service:{" "}
                        </Text>
                        Onde fica todas as services do projeto, responsaveis por
                        comunicar o front-end com o back-end.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta actions dentro do service:{" "}
                        </Text>
                        Onde fica os gatilhos responsaveis por se comunicar com
                        o back-end e enviar os dados para os reducers.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta reducers dentro do service:{" "}
                        </Text>
                        Onde fica os reducers que são responsaveis por alterar
                        os dados na store do Redux.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta images:{" "}
                        </Text>
                        Onde fica todas as imagens do projeto.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Pasta components:{" "}
                        </Text>
                        Onde fica todos os componentes globais do projeto.
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
