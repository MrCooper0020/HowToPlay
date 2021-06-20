import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function Faq() {
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
                            Funcionabilidades do app
                        </Text>
                    </View>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Conta: </Text>É
                        possivel criar uma conta no app e logar, o app tambem
                        permite que email e senha ficam salvas para logar mais
                        rapidamente.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Página de game:{" "}
                        </Text>
                        O app permite que usuarios que tenham uma conta e
                        estejam logado, criem uma página sobre um jogo que o
                        usuario queira discutir com a comunidade, tambem sendo
                        possivel editar e deletar somente pelo usuario criador.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Comentarios:{" "}
                        </Text>
                        Dentro de uma pagina de jogo, é possivel que usuarios
                        logados criem comentarios, tambem é possivel que os
                        usuarios editem e apaguem os comentarios que eles
                        criaram.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Dicas: </Text>
                        Dentro de uma pagina de jogo, há um botão chamado "Sala
                        de dicas" que está disponivel somente para usuarios
                        logados, entrando nele, os usuario teram uma area
                        somente para dicas sobre o jogo que podera ter spoiler
                        sobre a historia do jogo em questao.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Minha localizacão:{" "}
                        </Text>
                        O app permite que os usuarios utilizem um mapa para nao
                        se perderem na vida real.
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
