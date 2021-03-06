import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";

import { Provider as StoreProvider } from "react-redux";
import store from "./src/services/store";

// views imports
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import RegisterGame from "./src/views/RegisterGame";
import About from "./src/views/About";
import GamePage from "./src/views/GamePage";
import NewComment from "./src/views/NewComment";
import TipsRoom from "./src/views/TipsRoom";
import NewAccount from "./src/views/NewAccount";
import NewTip from "./src/views/NewTip";
import Maps from "./src/views/Maps";
import HowWasMade from "./src/views/HowWasMade";
import Architecture from "./src/views/Architecture";
import Faq from "./src/views/Faq";

export default function App() {
    const Stack = createStackNavigator();

    return (
        <StoreProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={({ route, navigation }) => ({
                            title: "How to play",
                            headerShown: true,
                            headerLeft: () => (
                                <Button
                                    onPress={() => navigation.navigate("About")}
                                    title="Sobre"
                                    type="clear"
                                    titleStyle={{ color: "#2196F3" }}
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: "Login", headerShown: true }}
                    />
                    <Stack.Screen
                        name="RegisterGame"
                        component={RegisterGame}
                        options={{
                            title: "Adicionar jogo",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="About"
                        component={About}
                        options={{ title: "Sobre", headerShown: true }}
                    />
                    <Stack.Screen
                        name="GamePage"
                        component={GamePage}
                        options={({ route, navigation }) => ({
                            title: "Pagina do jogo",
                            headerShown: true,
                        })}
                    />
                    <Stack.Screen
                        name="NewComment"
                        component={NewComment}
                        options={{
                            title: "Novo comentario",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="TipsRoom"
                        component={TipsRoom}
                        options={{
                            title: "Sala de dicas",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="NewAccount"
                        component={NewAccount}
                        options={{
                            title: "Criar conta",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="NewTip"
                        component={NewTip}
                        options={{
                            title: "Nova Dica",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="Maps"
                        component={Maps}
                        options={{
                            title: "Minha localizac??o",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="HowWasMade"
                        component={HowWasMade}
                        options={{
                            title: "Expo ou CLI?",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="Architecture"
                        component={Architecture}
                        options={{
                            title: "Arquitetura",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="Faq"
                        component={Faq}
                        options={{
                            title: "FAQ",
                            headerShown: true,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
