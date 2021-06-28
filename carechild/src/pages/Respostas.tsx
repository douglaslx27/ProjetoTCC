import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import fonts from '../styles/fonts';
import { Header } from '../components/Header';
import { Resposta } from '../components/Resposta';
import { useRoute } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

interface Params {
    pergunta: {
        id: number;
        contato_usuario: string;
        conteudo: string;
        datapost: string;
        tema: string;
    }
}

interface RespostasProps {
    id: number;
    contato_usuario: string;
    id_pergunta: number;
    conteudo: string;
    datapost: string;
    tema: string;
}

interface ParamsUser {
    usuario: {
        nome: string;
        sexo: string;
        contato: string;
        estado: string;
        cidade: string;
    }
}

export function Respostas() {

    const route = useRoute();
    const navigation = useNavigation();

    const { pergunta } = route.params as Params;
    const { usuario } = route.params as ParamsUser;

    const [resposta, setResposta] = useState<RespostasProps[]>([]);
    const [conteudo, setConteudo] = useState<string>();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function listRespostas(id_pergunta: number) {
            const { data } = await api.get('/answers', { params: { id_pergunta } });
            setResposta(data);
        }
        listRespostas(pergunta.id);
    }, []);

    async function loadEmail() {
        const emails = await AsyncStorage.getItem('contato');
        if (!emails) {
            navigation.navigate('Cadastro');
        } else {
            setVisible(true);

        }
    }

    function handleChangeConteudo(conteudoS: string) {
        setConteudo(conteudoS);
    }

    async function criarResposta() {
        const contato = await AsyncStorage.getItem('contato');
        console.log(conteudo)
        console.log(contato)
        console.log(pergunta.id)
        if (conteudo) {
            await api.post('/answers', {
                contato_usuario: contato,
                id_pergunta: pergunta.id,
                conteudo: conteudo
            });
        }
        setVisible(false)
    }

    console.log(resposta);

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >
            <Header
                nome={usuario.nome}
                sexo={usuario.sexo}
                contato={usuario.contato}
                estado={usuario.estado}
                cidade={usuario.cidade}
            />

            <View style={styles.pergunta}>

                <Text style={styles.text}>
                    {pergunta.conteudo}
                </Text>

            </View>
            <FlatList
                data={resposta}
                renderItem={({ item }) => (
                    <Resposta
                        id={item.id}
                        contato_usuario={item.contato_usuario}
                        id_pergunta={item.id_pergunta}
                        conteudo={item.conteudo}
                        datapost={item.datapost}
                        tema={item.tema}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            {
                visible &&
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={"Escreva uma resposta"}
                        multiline={true}
                        onChangeText={handleChangeConteudo}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => criarResposta()}
                    >
                        <Feather
                            name="send"
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>


                </View>}
            {
                !visible &&
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={() => loadEmail()}
                >
                    <Feather
                        name="plus"
                        style={styles.buttonIcon}

                    />
                    <Text style={styles.buttonText}>
                        Criar Resposta
                    </Text>
                </TouchableOpacity>
            }

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    pergunta: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 2,
        borderRadius: 20,
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.text,
        paddingHorizontal: 10
    },
    inputContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 10
    },
    sendButton: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25

    },
    input: {
        borderWidth: 1,
        width: 280,
        height: 50,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10

    },
    buttonIcon: {
        fontSize: 30,
        color: 'white',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        alignItems: 'center',
        paddingBottom: 15,
        alignSelf: 'flex-start',
        right: 20,
        bottom: 10,
        height: 90,
        width: 90,
        borderRadius: 45,
        position: 'absolute'
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: fonts.text
    }
})