import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import UserImg from '../assets/Douglas.png';
import fonts from '../styles/fonts';
import api from "../services/api";

function reduzTexto(texto: string) {
    let textoSaida = texto.substr(0, 15);

    return textoSaida
}

interface PerguntasProps {
    id: number;
    contato_usuario: string;
    conteudo: string;
    datapost: string;
    tema: string;
}
interface UsuariosProps {
    nome: string;
    sexo: string;
    contato: string;
    estado: string;
    cidade: string;
}


export function Pergunta(dados: PerguntasProps) {

    const [usuario, setUsuario] = useState<UsuariosProps>();

    useEffect(() => {
        async function buscaUsuario(contato: string) {
            const { data } = await api.get('/users', { params: { contato } });

            setUsuario(data[0]);
        }
        buscaUsuario(dados.contato_usuario);

    }, []);

    let perguntaReduzida = reduzTexto(dados.conteudo);

    const navigation = useNavigation();

    function handleRespostas(pergunta: PerguntasProps) {
        navigation.navigate('Respostas', { pergunta, usuario });
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity

                activeOpacity={0.6}
                style={styles.button}
                onPress={() => handleRespostas(dados)}
            >
                <Image
                    source={UserImg}
                    style={styles.image}
                />
                <View style={styles.subContainer}>
                    <Text style={styles.userName}>
                        {usuario?.nome}
                    </Text>
                    <Text style={styles.text}>

                        {perguntaReduzida + [' ...']}
                    </Text>
                </View>

                <Text style={styles.dataHora}>
                    Data e Hora
                </Text>


            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: 'white',
        paddingVertical: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 20
    },
    subContainer: {
        marginLeft: 20,
        flex: 2
    },
    userName: {
        fontSize: 20,
        color: 'white',
        fontFamily: fonts.userName
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontFamily: fonts.question

    },
    dataHora: {
        fontSize: 10,
        color: 'white',
        marginLeft: 20,
        marginRight: 20,
        fontFamily: fonts.text
    }
})