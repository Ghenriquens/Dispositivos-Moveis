// GibiDetalhes.js
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert, View, Linking } from "react-native";
import { Card, Title, Paragraph, Button, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function GibiDetalhes({ route, navigation }) {
  const { gibi } = route.params;
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    verificarFavorito();
  }, []);

  async function verificarFavorito() {
    try {
      const dados = await AsyncStorage.getItem("favoritos");
      const favoritos = dados ? JSON.parse(dados) : [];
      const achou = favoritos.some((g) => g.titulo === gibi.titulo);
      setFavoritado(achou);
    } catch (error) {
      console.error("Erro ao verificar favoritos:", error);
    }
  }

  async function toggleFavorito() {
    try {
      const dados = await AsyncStorage.getItem("favoritos");
      let favoritos = dados ? JSON.parse(dados) : [];

      if (favoritado) {
        favoritos = favoritos.filter((g) => g.titulo !== gibi.titulo);
        Alert.alert("Removido", "Gibi removido dos favoritos.");
      } else {
        favoritos.push(gibi);
        Alert.alert("Adicionado", "Gibi adicionado aos favoritos.");
      }

      await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
      setFavoritado(!favoritado);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        {gibi.imagem && (
          <Card.Cover source={{ uri: gibi.imagem }} style={styles.capa} />
        )}
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.titulo}>{gibi.titulo}</Title>
            <Button
              mode={favoritado ? "contained" : "outlined"}
              buttonColor="#4A148C"
              textColor="#fff"
              onPress={toggleFavorito}
              style={styles.botaoFavorito}
            >
              {favoritado ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </Button>
          </View>

          <Divider style={styles.divider} />

          <Section title="Sinopse">
            <Paragraph style={styles.paragrafo}>
              {gibi.sinopse || "Não informado."}
            </Paragraph>
          </Section>

          <Divider style={styles.divider} />

          <Section title="Autor">
            <Paragraph style={styles.paragrafo}>
              {gibi.autor || "Desconhecido"}
            </Paragraph>
          </Section>

          <Divider style={styles.divider} />

          <Section title="Editora">
            <Paragraph style={styles.paragrafo}>
              {gibi.editora || "Não informada"}
            </Paragraph>
          </Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Title style={styles.subtitulo}>{title}</Title>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 14 },
  card: {
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#4A148C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  capa: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 260,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#4A148C",
    flex: 1,
    flexWrap: "wrap",
  },
  botaoFavorito: { minWidth: 160 },
  divider: {
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E1BEE7",
  },
  section: { marginBottom: 10 },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 6,
  },
  paragrafo: {
    fontSize: 17,
    color: "#4E4E4E",
    lineHeight: 26,
  },
});
