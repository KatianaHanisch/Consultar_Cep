import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { api } from "./src/services/api";

export default function App() {
  const [cepDigitado, setCepDigitado] = useState("");
  const [dados, setDados] = useState(null);

  const inputRef = useRef();

  async function buscarCep() {
    if (cepDigitado == "") {
      alert("Digite um cep válido");
      setCepDigitado("");
      return;
    }

    try {
      const { data } = await api.get(`${cepDigitado}/json`);
      setDados(data);
      Keyboard.dismiss();
    } catch (erro) {
      alert("CEP não encontrado");
      console.log(erro);
    }

    setCepDigitado("");
  }

  function limparCampo() {
    setCepDigitado("");
    inputRef.current.focus();
    setDados(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCep}>
        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Consultar de CEP</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="EX: 78557547"
          value={cepDigitado}
          onChangeText={(value) => setCepDigitado(value)}
          ref={inputRef}
        />
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.areaButton} onPress={buscarCep}>
            <Text style={styles.textoButton}>Buscar CEP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.areaButton} onPress={limparCampo}>
            <Text style={styles.textoButton}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      {dados && (
        <View style={styles.containerDadosCep}>
          <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Resultado da busca:</Text>
          </View>
          <View style={styles.containerInformacoes}>
            <Text style={styles.textoCep}>{"Cep: " + dados.cep}</Text>
            <Text style={styles.textoCep}>
              {"Logradouro: " + dados.logradouro}
            </Text>
            <Text style={styles.textoCep}>Bairro: {dados.bairro}</Text>
            <Text style={styles.textoCep}>Cidade: {dados.localidade}</Text>
            <Text style={styles.textoCep}>Estado: {dados.uf}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 30,
  },
  containerCep: {
    backgroundColor: "#dce0e6",
    width: "90%",
    alignItems: "center",
    height: 230,
    borderRadius: 9,
  },
  containerTitulo: {
    backgroundColor: "#5c5863",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fffbff",
  },
  input: {
    backgroundColor: "#fcfcfc",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  areaButton: {
    backgroundColor: "#2b364a",
    borderRadius: 9,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
    margin: 10,
  },
  textoButton: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerDadosCep: {
    backgroundColor: "#dce0e6",
    width: "90%",
    flex: 1,
    borderRadius: 9,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  containerInformacoes: {
    backgroundColor: "#fcfcfc",
    width: "90%",
    height: "85%",
    borderRadius: 9,
    paddingTop: 20,
    paddingLeft: 15,
  },
  textoCep: {
    fontSize: 20,
  },
});
