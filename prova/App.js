// App.js
import "react-native-gesture-handler"; // <- IMPORT NECESSÁRIO PARA NAVEGAÇÃO FUNCIONAR!

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import { LoginUsuario } from "./screens/LoginUsuario";
import { CadastroUsuario } from "./screens/CadastroUsuario";
import { HomeGibi } from "./screens/HomeGibi";
import { ListaGibis } from "./screens/ListaGibis";
import { CadastroGibi } from "./screens/CadastroGibi";
import { GibiDetalhes } from "./screens/GibiDetalhes";
import { GibiApiDetalhes } from "./screens/GibiApiDetalhes";
import { BuscarGibisAPI } from "./screens/BuscarGibisAPI";
import { GibisFavoritos } from "./screens/GibisFavoritos";
import { PerfilUsuario } from "./screens/PerfilUsuario";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Login"
          component={LoginUsuario}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroUsuario}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="HomeGibi"
          component={HomeGibi}
          options={{ title: "Loja de Gibis" }}
        />
        <Stack.Screen
          name="ListaGibis"
          component={ListaGibis}
          options={{ title: "Meus Gibis" }}
        />
        <Stack.Screen
          name="CadastroGibi"
          component={CadastroGibi}
          options={{ title: "Cadastrar Gibi" }}
        />
        <Stack.Screen
          name="GibiDetalhes"
          component={GibiDetalhes}
          options={{ title: "Detalhes do Gibi" }}
        />
        <Stack.Screen
          name="GibiApiDetalhes"
          component={GibiApiDetalhes}
          options={{ title: "Gibi da API" }}
        />
        <Stack.Screen
          name="BuscarGibisAPI"
          component={BuscarGibisAPI}
          options={{ title: "Buscar na API" }}
        />
        <Stack.Screen
          name="GibisFavoritos"
          component={GibisFavoritos}
          options={{ title: "Favoritos" }}
        />
        <Stack.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: "Meu Perfil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
