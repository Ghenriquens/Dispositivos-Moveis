// CadastroGibi.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Button, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function CadastroGibi({ navigation, route }) {
  const gibiEdit = route.params?.gibi;
  const gibiIndex = route.params?.index;

  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (gibiEdit) {
      setTitulo(gibiEdit.titulo);
      setSinopse(gibiEdit.sinopse);
      setAutor(gibiEdit.autor);
      setEditora(gibiEdit.editora);
      setImagem(gibiEdit.imagem);
    }
  }, [gibiEdit]);

  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const salvarGibi = async () => {
    if (!titulo || !sinopse || !autor || !editora) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novoGibi = {
      titulo,
      sinopse,
      autor,
      editora,
      imagem,
    };

    const gibisSalvos = JSON.parse(await AsyncStorage.getItem("gibis")) || [];

    if (typeof gibiIndex === "number") {
      gibisSalvos[gibiIndex] = novoGibi;
    } else {
      gibisSalvos.push(novoGibi);
    }

    await AsyncStorage.setItem("gibis", JSON.stringify(gibisSalvos));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Capa do Gibi:</Text>
        <Card style={styles.cardImagem} onTouchEnd={selecionarImagem}>
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.preview} />
          ) : (
            <View style={styles.iconeVazio}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={80}
                color="#7B1FA2"
              />
              <Text style={styles.textoIconeVazio}>
                Toque para selecionar uma imagem
              </Text>
            </View>
          )}
        </Card>

        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título do gibi"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Sinopse:</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Resumo da história"
          value={sinopse}
          onChangeText={setSinopse}
          multiline
        />

        <Text style={styles.label}>Autor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do autor"
          value={autor}
          onChangeText={setAutor}
        />

        <Text style={styles.label}>Editora:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da editora"
          value={editora}
          onChangeText={setEditora}
        />

        <Button
          mode="contained"
          onPress={salvarGibi}
          style={styles.botaoSalvar}
          labelStyle={{ fontWeight: "bold", fontSize: 18 }}
          buttonColor="#4A148C"
        >
          Salvar Gibi
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#6A1B9A",
    textAlign: "center",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4A148C",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 18,
    color: "#333",
  },
  multiline: { height: 100, textAlignVertical: "top" },
  cardImagem: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  preview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  iconeVazio: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E5F5",
  },
  textoIconeVazio: {
    marginTop: 10,
    fontSize: 16,
    color: "#7B1FA2",
    fontWeight: "600",
  },
  botaoSalvar: {
    marginTop: 30,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
