import React from "react";
import { Button, View } from "react-native";

import {
  MainContainer,
  Head1,
  FormField,
  FormLabel,
  FormInput,
  Divider,
  TextLink,
} from "../../styles/index";

export default function Login({navigation}) {
  return (
    <MainContainer>
      <Head1>Inicio de Sesion</Head1>

      <View>
        <FormField>
          <FormLabel>Correo electronico</FormLabel>
          <FormInput keyboardType="email-address" />
        </FormField>

        <FormField>
          <FormLabel>Contraseña</FormLabel>
          <FormInput keyboardType="default" secureTextEntry={true} />
        </FormField>

        <Button title="ENTRAR" color="#5B7FFF" onPress={() => navigation.navigate('MainPage')}/>
      </View>

      <Divider />

      <TextLink>¿Olvidaste tu contraseña?</TextLink>
    </MainContainer>
  );
}
