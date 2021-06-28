import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cadastro } from './src/pages/Cadastro';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_600SemiBold,
  RobotoSlab_500Medium
} from '@expo-google-fonts/roboto-slab';

export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_600SemiBold,
    RobotoSlab_500Medium
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Aguarde as fontes carregarem!!
        </Text>
      </View>
    )
  }

  return (


    <View style={styles.container}>

      <Routes />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
