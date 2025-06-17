// ListaGibis.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_SIZE = width / 2.3;

export function ListaGibis({ navigation }) {
  const [gibis, setGibis] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarGibis);
    return unsubscribe;
  }, [navigation]);

  async function carregarGibis() {
    const dados = await AsyncStorage.getItem("gibis");
    setGibis(dados ? JSON.parse(dados) : []);
  }

  const excluirGibi = (index) => {
    Alert.alert("Excluir Gibi", "Tem certeza que deseja excluir este gibi?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const novosGibis = [...gibis];
          novosGibis.splice(index, 1);
          await AsyncStorage.setItem("gibis", JSON.stringify(novosGibis));
          setGibis(novosGibis);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("GibiDetalhes", { gibi: item })}
      activeOpacity={0.8}
    >
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.imagem} />
      ) : (
        <View style={[styles.imagem, styles.imagemVazia]}>
          <FontAwesome name="book" size={40} color="#ccc" />
        </View>
      )}
      <Text style={styles.titulo} numberOfLines={2}>
        {item.titulo}
      </Text>
      <View style={styles.botoes}>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate("CadastroGibi", { gibi: item, index });
          }}
          style={styles.botaoEditar}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            excluirGibi(index);
          }}
          style={styles.botaoExcluir}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloTela}>Meus Gibis</Text>
      <FlatList
        data={gibis}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.lista}
      />
      <TouchableOpacity
        style={styles.botaoAdd}
        onPress={() => navigation.navigate("CadastroGibi")}
      >
        <Text style={styles.textoBotaoAdd}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 12,
  },
  tituloTela: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 30,
    alignSelf: "center",
  },
  lista: { paddingBottom: 100, justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 12,
    width: CARD_SIZE,
    alignItems: "center",
    paddingVertical: 15,
    elevation: 5,
  },
  imagem: {
    width: CARD_SIZE * 0.8,
    height: CARD_SIZE * 0.8,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#f9f9f9",
  },
  imagemVazia: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  titulo: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#4A148C",
    textAlign: "center",
  },
  botoes: { flexDirection: "row", marginTop: 14, justifyContent: "center" },
  botaoEditar: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 6,
  },
  botaoExcluir: {
    backgroundColor: "#4A148C",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 6,
  },
  textoBotao: { color: "#fff", fontWeight: "700", fontSize: 14 },
  botaoAdd: {
    position: "absolute",
    bottom: 28,
    right: 28,
    backgroundColor: "#4A148C",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoAdd: { color: "#fff", fontSize: 36, lineHeight: 36 },
});
