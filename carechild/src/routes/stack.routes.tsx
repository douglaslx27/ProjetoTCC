import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Perguntas } from "../pages/Perguntas";
import { Respostas } from "../pages/Respostas";
import { Cadastro } from "../pages/Cadastro";



const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (

    <stackRoutes.Navigator
        headerMode="none"
    >
        <stackRoutes.Screen
            name="Perguntas"
            component={Perguntas}
        />

        <stackRoutes.Screen
            name="Cadastro"
            component={Cadastro}
        />

        <stackRoutes.Screen
            name="Respostas"
            component={Respostas}
        />


    </stackRoutes.Navigator>
)

export default AppRoutes;