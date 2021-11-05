import React, { useState, useEffect } from "react";
import { Button, View, Alert, Text } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { setToken } from "../../utils/slices";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState();

  const [noEmail, setNoEmail] = useState("");
  const [noPass, setNoPass] = useState("");

  const [noMatchCredentials, setNoMatchCredentials] = useState("");

  const dispatch = useDispatch();

  const getCredentials = () => {
    if (!email) {
      setNoEmail(false);
    } else if (!password) {
      setNoPass(false);
    } else if (email && password) {
      setNoEmail(true);
      setNoPass(true);

      setUserLogin("Cargando");

      return fetch("https://lara-api-sanctum.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          const credential = json;
          console.log("credential msg", credential);

          if (credential.token) {
            dispatch(setToken(credential));
            navigation.navigate("MainPage");
          } else if (credential.message == "undefined") {
            console.log("bug");
          } else if (credential.message) {
            setNoMatchCredentials(true);
            setUserLogin("");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // getCheckTurn();
      return () => {
        setEmail("")
        setPassword("")
        setUserLogin("")
      };
    }, [])
  );

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

    if (biometricAuth && biometricAuth.success) {
      navigation.navigate("MainPage");
    }
  };
  
  return (
    <MainContainer>
      <Head1>Inicio de Sesion</Head1>

      <View>
        <FormField>
          <FormLabel>Correo electronico</FormLabel>
          <FormInput
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            name="email"
          />
          {noEmail === false ? (
            <Text style={{ color: "red" }}>Por favor ingresa un correo</Text>
          ) : null}
        </FormField>

        <FormField>
          <FormLabel>Contraseña</FormLabel>
          <FormInput
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={setPassword}
            name="password"
          />
          {noPass === false ? (
            <Text style={{ color: "red" }}>
              Por favor ingresa tu contraseña
            </Text>
          ) : null}
        </FormField>

        {/* {isBiometricSupported ? (
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
        )} */}

        {!userLogin ? (
          <Button title="ENTRAR" color="#5B7FFF" onPress={getCredentials} />
        ) : (
          <Button title={userLogin} color="#5B7FFF" />
        )}

        {noMatchCredentials === true ? (
          <Text style={{ color: "red", marginTop: 10 }}>
            Error al iniciar: Tu email o contraseña son incorrectos
          </Text>
        ) : null}
      </View>

      <Divider />

      <TextLink>¿Olvidaste tu contraseña?</TextLink>
    </MainContainer>
  );
}
