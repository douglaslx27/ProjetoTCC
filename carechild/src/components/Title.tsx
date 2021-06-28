import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Feather } from "@expo/vector-icons";
import fonts from '../styles/fonts';


import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export function Title() {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                Shild Care
            </Text>

            <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.buttonText}>
                    <Feather
                        name="settings"
                        style={styles.buttonIcon}
                    />
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(72, 190, 170, 1)',
        borderWidth: 0.2,
        borderColor: 'white',
        marginTop: getStatusBarHeight(),
        paddingVertical: 20
    },
    text: {
        fontSize: 40,
        marginLeft: 20,
        color: 'white',
        fontFamily: fonts.title
    },
    buttonText: {
        marginRight: 20
    },
    buttonIcon: {
        fontSize: 32,
        marginRight: 30,
        color: 'white'
    }
})