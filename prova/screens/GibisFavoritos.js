// GibisFavoritos.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export function GibisFavoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarFavoritos);
    return unsubscribe;
  }, [navigation]);

  async function carregarFavoritos() {
    const dadosLocais = await AsyncStorage.getItem("gibis");
    const dadosApi = await AsyncStorage.getItem("favoritosAPI");

    const locais = dadosLocais ? JSON.parse(dadosLocais) : [];
    const locaisFavoritos = locais.filter((g) => g.favorito);

    const api = dadosApi ? JSON.parse(dadosApi) : [];

    const combinados = [
      ...locaisFavoritos.map((g) => ({ ...g, origem: "local" })),
      ...api.map((g) => ({
        id: g.id,
        titulo: g.titulo,
        imagem: g.thumb,
        origem: "api",
        gibiApi: g,
      })),
    ];

    setFavoritos(combinados);
  }

  const removerFavorito = async (item) => {
    if (item.origem === "local") {
      const dadosLocais = await AsyncStorage.getItem("gibis");
      let locais = dadosLocais ? JSON.parse(dadosLocais) : [];
      locais = locais.map((g) => {
        if (g.titulo === item.titulo) g.favorito = false;
        return g;
      });
      await AsyncStorage.setItem("gibis", JSON.stringify(locais));
    } else {
      const dadosApi = await AsyncStorage.getItem("favoritosAPI");
      let api = dadosApi ? JSON.parse(dadosApi) : [];
      api = api.filter((g) => g.id !== item.id);
      await AsyncStorage.setItem("favoritosAPI", JSON.stringify(api));
    }
    carregarFavoritos();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          if (item.origem === "local") {
            navigation.navigate("GibiDetalhes", { gibi: item });
          } else {
            navigation.navigate("GibiApiDetalhes", { gibi: item.gibiApi });
          }
        }}
      >
        {item.imagem ? (
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
        ) : (
          <View style={[styles.imagem, styles.imagemVazia]}>
            <Text style={{ color: "#999" }}>Sem Imagem</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.origem}>
            {item.origem === "api" ? "API Externa" : "Gibi Local"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removerFavorito(item)}
        style={styles.btnRemover}
      >
        <Text style={styles.txtRemover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloTela}>Meus Gibis Favoritos</Text>

      {favoritos.length === 0 ? (
        <View style={styles.semFavoritosContainer}>
          <FontAwesome name="heart" size={64} color="#4A148C" />
          <Text style={styles.textoSemFavoritos}>
            Você ainda não adicionou nenhum gibi aos favoritos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 60,
  },
  tituloTela: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 30,
    alignSelf: "center",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F3E5F5",
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  imagemVazia: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flexShrink: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A148C",
  },
  origem: {
    fontSize: 14,
    color: "#7B1FA2",
    marginTop: 4,
  },
  btnRemover: {
    backgroundColor: "#4A148C",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  txtRemover: {
    color: "#fff",
    fontWeight: "bold",
  },
  semFavoritosContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textoSemFavoritos: {
    fontSize: 18,
    color: "#4A148C",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
