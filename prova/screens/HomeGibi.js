// HomeGibi.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Title } from "react-native-paper";

export function HomeGibi({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <Title style={styles.titulo}>Bem-vindo à Loja de Gibis!</Title>

      <Button
        mode="contained"
        style={styles.botao}
        onPress={() => navigation.navigate("ListaGibis")}
        buttonColor="#4A148C"
      >
        Meus Gibis
      </Button>

      <Button
        mode="contained"
        style={styles.botao}
        onPress={() => navigation.navigate("BuscarGibisAPI")}
        buttonColor="#7B1FA2"
      >
        Buscar Gibis na API
      </Button>

      <Button
        mode="outlined"
        style={styles.botao}
        onPress={() => navigation.navigate("GibisFavoritos")}
        textColor="#4A148C"
      >
        Favoritos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf7ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 32,
    textAlign: "center",
  },
  botao: {
    marginVertical: 10,
    minWidth: 240,
  },
});
