import React, { useState, useEffect } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { Title } from '../components/Title';
import { Cadastro } from './Cadastro';
import { Pergunta } from '../components/Pergunta';
import { Feather } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import api from '../services/api';

interface PerguntasProps {
    id: number;
    contato_usuario: string;
    conteudo: string;
    datapost: string;
    tema: string;
}

export function Perguntas() {
    const navigation = useNavigation();
    const [perguntas, setPerguntas] = useState<PerguntasProps[]>([]);
    const [visible, setVisible] = useState(false);
    const [conteudo, setConteudo] = useState<string>();

    useEffect(() => {
        async function listPerguntas() {
            const { data } = await api.get('/questions?sort=nome&order=asc');
            setPerguntas(data);

        }
        listPerguntas();

    }, [])

    function handleChangeConteudo(conteudoS: string) {
        setConteudo(conteudoS);
    }

    async function loadEmail() {
        const emails = await AsyncStorage.getItem('contato');
        if (!emails) {
            navigation.navigate('Cadastro');
        } else {
            setVisible(true);

        }
    }
    async function fazerPergunta() {
        const contato = await AsyncStorage.getItem('contato');
        console.log(conteudo)
        console.log(contato)
        if (conteudo) {
            await api.post('/questions', {
                contato_usuario: contato,
                conteudo: conteudo
            });
        }

        setVisible(false)
        navigation.navigate('Perguntas');

    }

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >
            <View style={styles.subContainer}>

                <Title />

                <View>
                    <FlatList
                        data={perguntas}
                        renderItem={({ item }) => (

                            <Pergunta
                                id={item.id}
                                contato_usuario={item.contato_usuario}
                                conteudo={item.conteudo}
                                datapost={item.datapost}
                                tema={item.tema}
                            />
                        )}
                        showsVerticalScrollIndicator={false}

                    />
                </View>


            </View>
            {
                visible &&
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={"Escreva uma pergunta"}
                        multiline={true}
                        onChangeText={handleChangeConteudo}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => fazerPergunta()}
                    >
                        <Feather
                            name="send"
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>


                </View>
            }
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
                        Nova Pergunta
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
    subContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
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
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        alignItems: 'center',
        paddingBottom: 15,
        alignSelf: 'flex-end',
        right: 20,
        bottom: 10,
        height: 90,
        width: 90,
        borderRadius: 45,
        position: 'absolute'
    },
    buttonIcon: {
        fontSize: 30,
        color: 'white',
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: fonts.text
    }
});
