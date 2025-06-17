// PerfilUsuario.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  Surface,
  Text,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "Leitor de Gibis",
    email: "leitor@email.com",
    foto: "https://via.placeholder.com/150",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEdit, setNomeEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [fotoEdit, setFotoEdit] = useState("");

  useEffect(() => {
    async function carregarUsuario() {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados) setUsuario(JSON.parse(dados));
    }
    carregarUsuario();
  }, []);

  const abrirEdicao = () => {
    setNomeEdit(usuario.nome);
    setEmailEdit(usuario.email);
    setFotoEdit(usuario.foto);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!nomeEdit.trim() || !emailEdit.trim()) {
      Alert.alert("Erro", "Nome e email são obrigatórios.");
      return;
    }

    const novoUsuario = {
      nome: nomeEdit.trim(),
      email: emailEdit.trim(),
      foto: fotoEdit.trim() || "https://via.placeholder.com/150",
    };

    setUsuario(novoUsuario);
    await AsyncStorage.setItem("usuario", JSON.stringify(novoUsuario));
    setModalVisible(false);
  };

  const sair = async () => {
    Alert.alert("Sair", "Deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("usuario");
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card}>
        <Avatar.Image
          size={120}
          source={{ uri: usuario.foto }}
          style={styles.avatar}
        />
        <Title style={styles.title}>{usuario.nome}</Title>
        <Paragraph style={styles.info}>Email: {usuario.email}</Paragraph>

        <Button mode="contained" onPress={abrirEdicao} style={styles.button}>
          Editar Perfil
        </Button>

        <Button
          mode="outlined"
          onPress={sair}
          style={[styles.button, styles.buttonSair]}
          color="#4A148C"
        >
          Sair
        </Button>
      </Surface>

      {/* Modal de edição */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Editar Perfil</Text>

            <TextInput
              placeholder="Nome"
              value={nomeEdit}
              onChangeText={setNomeEdit}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              value={emailEdit}
              onChangeText={setEmailEdit}
              style={styles.input}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="URL da Foto"
              value={fotoEdit}
              onChangeText={setFotoEdit}
              style={styles.input}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, styles.btnCancelar]}
              >
                <Text style={{ color: "#4A148C", fontWeight: "bold" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={salvarEdicao}
                style={[styles.modalBtn, styles.btnSalvar]}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf7ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 6,
  },
  avatar: { marginBottom: 20, backgroundColor: "#4A148C" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 8,
  },
  info: { fontSize: 16, color: "#6d4c91", marginBottom: 4 },
  button: { marginTop: 20, width: "60%", backgroundColor: "#4A148C" },
  buttonSair: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#4A148C",
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    elevation: 20,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#4A148C",
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  modalBotoes: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  btnCancelar: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#4A148C",
  },
  btnSalvar: {
    backgroundColor: "#4A148C",
  },
});
