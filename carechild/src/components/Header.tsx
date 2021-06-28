import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';
import UserImg from '../assets/Douglas.png';
import fonts from '../styles/fonts';
import api from '../services/api';

interface UsuariosProps {
    nome: string;
    sexo: string;
    contato: string;
    estado: string;
    cidade: string;
}

export function Header(user: UsuariosProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Feather
                    name='chevron-left'
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.header}>
                <Image
                    source={UserImg}
                    style={styles.image}
                />

                <Text style={styles.text}>
                    {user.nome}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        //justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(72, 190, 170, 1)',
        marginTop: getStatusBarHeight(),
        flexDirection: 'row',
        borderWidth: 0.2,
        borderColor: 'white',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 30,
        color: 'white',
        // paddingLeft: 10
    },
    image: {
        width: 60,
        height: 60,
        marginLeft: 10,
        borderRadius: 30,

    },
    text: {
        fontFamily: fonts.userName,
        fontSize: 24,
        paddingLeft: 20,
        color: 'white',
        marginRight: 20

    }
})