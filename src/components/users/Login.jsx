import React, {useState, useEffect} from "react";
import { Button, View, Alert } from "react-native";
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
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        "Please enter your password",
        "Biometric Authentication not supported",
        "OK",
        () => fallBackToDefaultAuth()
      );

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        "Datos de huella no encontrados",
        "Por favor ingresa tu contraseña",
        "OK",
        () => fallBackToDefaultAuth()
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Entrar con tu huella",
      cancelLabel: "Cancelar",
      disableDeviceFallback: true,
    });

    if (biometricAuth && biometricAuth.success){
      navigation.navigate("MainPage")
    }
  };

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

        {isBiometricSupported ? (
          <Button
            title="ENTRAR"
            color="#5B7FFF"
            onPress={handleBiometricAuth}
          />
        ) : (
          <Button
            title="ENTRAR"
            color="#5B7FFF"
            onPress={() => navigation.navigate("MainPage")}
          />
        )}
      </View>

      <Divider />

      <TextLink>¿Olvidaste tu contraseña?</TextLink>
    </MainContainer>
  );
}
