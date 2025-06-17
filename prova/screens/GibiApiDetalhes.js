// GibiApiDetalhes.js
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function GibiApiDetalhes({ route }) {
  const { gibi } = route.params;
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    verificarFavorito();
  }, []);

  async function verificarFavorito() {
    const dadosApi = await AsyncStorage.getItem("favoritosAPI");
    const favoritos = dadosApi ? JSON.parse(dadosApi) : [];
    const achou = favoritos.some((g) => g.id === gibi.id);
    setFavoritado(achou);
  }

  async function toggleFavorito() {
    const dadosApi = await AsyncStorage.getItem("favoritosAPI");
    let favoritos = dadosApi ? JSON.parse(dadosApi) : [];

    if (favoritado) {
      favoritos = favoritos.filter((g) => g.id !== gibi.id);
      Alert.alert("Removido", "Gibi removido dos favoritos.");
    } else {
      favoritos.push(gibi);
      Alert.alert("Adicionado", "Gibi adicionado aos favoritos.");
    }

    await AsyncStorage.setItem("favoritosAPI", JSON.stringify(favoritos));
    setFavoritado(!favoritado);
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      <Card>
        <Card.Cover source={{ uri: gibi.thumb }} />
        <Card.Content>
          <Title>{gibi.titulo}</Title>
          <Paragraph>Categoria: {gibi.categoria}</Paragraph>
          <Paragraph>Origem: {gibi.origem}</Paragraph>

          <Button
            mode={favoritado ? "contained" : "outlined"}
            onPress={toggleFavorito}
            style={{ marginVertical: 10 }}
            buttonColor="#4A148C"
            textColor="#fff"
          >
            {favoritado ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </Button>

          <Title style={styles.subtitulo}>Descrição</Title>
          <Paragraph>{gibi.descricao || "Sem descrição disponível."}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitulo: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#4A148C",
    fontSize: 18,
  },
});
