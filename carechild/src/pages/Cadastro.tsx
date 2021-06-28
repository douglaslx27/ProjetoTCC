import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { RadioButton } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../styles/fonts";

export function Cadastro() {
    const navigation = useNavigation();

    const [nome, setNome] = useState<string>();
    const [sexo, setSexo] = useState<string>();
    const [contato, setContato] = useState<string>();
    const [estado, setEstado] = useState<string>();
    const [cidade, setCidade] = useState<string>();

    function handleChangeNome(nomeS: string) {
        setNome(nomeS);
    }
    function handleChangeContato(emailS: string) {
        setContato(emailS);
    }
    function handleChangeEstado(estadoS: string) {
        setEstado(estadoS);
    }
    function handleChangeCidade(cidadeS: string) {
        setCidade(cidadeS);
    }

    async function setUsuario(contato: string) {
        console.log(contato);
        const { data } = await api.get('/users', { params: { contato } });
        if (data[0]) {
            return Alert.alert('Esse Email já está sendo usado');
        } else {

            await api.post('/users', {
                nome: nome,
                sexo: sexo,
                contato: contato,
                cidade: cidade,
                estado: estado
            })

        }
    }

    async function handlePerguntas() {
        if (!nome)
            return Alert.alert('Informe o Nome Por Favor')
        if (!sexo)
            return Alert.alert('Informe o Sexo Por Favor')
        if (!contato)
            return Alert.alert('Informe o Email Por Favor')
        if (!estado)
            return Alert.alert('Informe o Estado Por Favor')
        if (!cidade)
            return Alert.alert('Informe a Cidade Por Favor')

        await setUsuario(contato);

        await AsyncStorage.setItem('nome', nome)
        await AsyncStorage.setItem('sexo', sexo)
        await AsyncStorage.setItem('contato', contato)
        await AsyncStorage.setItem('estado', estado)
        await AsyncStorage.setItem('cidade', cidade)

        navigation.navigate('Perguntas');

    }

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.text} >
                    Informe seu nome
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={"Digite seu nome aqui"}
                    onChangeText={handleChangeNome}
                />
                <Text style={styles.text} >
                    Sexo
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.text}>
                        Masculino
                    </Text>
                    <RadioButton
                        value="M"
                        status={sexo === 'M' ? 'checked' : 'unchecked'}
                        onPress={() => setSexo('M')}
                    />
                    <Text style={styles.text}>
                        {`\t`} Feminino
                    </Text>
                    <RadioButton
                        value="F"
                        status={sexo === 'F' ? 'checked' : 'unchecked'}
                        onPress={() => setSexo('F')}
                    />
                </View>
                <Text style={styles.text} >
                    Informe seu email
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Digite email aqui"}
                    onChangeText={handleChangeContato}
                />
                <Text style={styles.text} >
                    Informe seu estado
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Digite Estado aqui"}
                    onChangeText={handleChangeEstado}
                />
                <Text style={styles.text} >
                    Informe sua cidade
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Digite sua cidade aqui"}
                    onChangeText={handleChangeCidade}
                />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={() => handlePerguntas()}
                >
                    <Text style={styles.textButton}>
                        Salvar
                    </Text>

                </TouchableOpacity>
            </KeyboardAvoidingView>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.userName,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        width: 200,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        margin: 10
    },
    button: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        width: 80,
        height: 50
    },
    textButton: {
        fontSize: 12,
        fontFamily: fonts.userName,
        color: 'white'

    }
})