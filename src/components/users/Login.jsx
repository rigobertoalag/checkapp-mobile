import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import {
  MainContainer,
  Head1,
  FormField,
  FormLabel,
  FormInput,
  Divider,
  TextLink,
} from "../../styles/index";

export default function Login({ navigation }) {
  const [sata, setSata] = useState();

  const getSata = () =>{
      const sataraw = JSON.stringify(LocalAuthentication.supportedAuthenticationTypesAsync)
      const sataconv = sataraw
    setSata(sataconv)
    console.log(sata)
  }

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

        <Button
          title="ENTRAR"
          color="#5B7FFF"
          onPress={() => navigation.navigate("MainPage")}
        />
      </View>

      <Button
          title="TEST"
          color="#5B7FFF"
          onPress={() => getSata()}
        />

        <Text>Esta es la SATA: </Text>

      <Divider />

      <TextLink>¿Olvidaste tu contraseña?</TextLink>
    </MainContainer>
  );
}
