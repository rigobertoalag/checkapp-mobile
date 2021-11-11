import React, { useState } from "react";
import { View, Text, TouchableHighlight, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import InfoContainer from "./mainPage/InfoContainer";
import InfoFullCheck from "./mainPage/InfoFullCheck";
import Divider from "../styles/Divider";
import Header from "./mainPage/Header";

export default function MainPage({ navigation }) {
  const credentials = useSelector((state) => state.token.value);

  const [checkTurn, setCheckTurn] = useState();
  const [checkFull, setCheckFull] = useState();

  const getCheckTurn = async () => {
    try {
      const response = await fetch(
        "https://lara-api-sanctum.herokuapp.com/api/statuscheck",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + credentials.token,
          },
        }
      );
      const json = await response.json();
      const check = json;

      setCheckTurn(check);
    } catch (error) {
      console.error(error);
    }
  };

  const getCheckFull = async () => {
    try {
      const response = await fetch(
        "https://lara-api-sanctum.herokuapp.com/api/checkfull",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + credentials.token,
          },
        }
      );
      const json = await response.json();
      const checkFull = json;

      setCheckFull(checkFull);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(
        "https://lara-api-sanctum.herokuapp.com/api/logout",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + credentials.token,
          },
        }
      );
      const json = await response.json();
      const logout = json;
      console.log("logout", logout);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const logOutAlert = () =>
    Alert.alert("Cerrar Sesion", "¿Estas seguro que deseas salir?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => logOut() },
    ]);

  useFocusEffect(
    React.useCallback(() => {
      getCheckTurn();
      getCheckFull();
      return () => {
        setCheckTurn();
        setCheckFull();
      };
    }, [])
  );

  return (
    <View style={{ height: "100%" }}>
      {Header({ userName: credentials.user.name })}

      <TouchableHighlight
        style={{ position: "absolute", marginTop: "10%", marginLeft: "85%" }}
        onPress={logOutAlert}
      >
        <MaterialIcons name="exit-to-app" size={32} color="white" />
      </TouchableHighlight>

      {checkTurn ? (
        <>
          {checkTurn.beginTurn ? (
            <LinearGradient
              colors={["#FF5630", "#ff754b"]}
              start={[0.1, 0.3]}
              style={{
                height: "15%",
                width: "50%",
                position: "absolute",
                top: "32%",
                alignSelf: "center",
                zIndex: 1,
                borderRadius: 20,
              }}
            >
              <TouchableHighlight
                onPress={() => navigation.navigate("CheckOut")}
                style={{ height: "50%", flexDirection:'column', alignItems:'center'}}
              >
                <MaterialIcons name="exit-to-app" size={45} color="black" style={{marginTop: "10%"}}/>
              </TouchableHighlight>
              <Text style={{ alignSelf: "center", color: "black", fontSize: 22 }}>
                TERMINAR TURNO
              </Text>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={["#38CB89", "#70e4b0"]}
              start={[0.1, 0.3]}
              style={{
                height: "15%",
                width: "50%",
                position: "absolute",
                top: "32%",
                alignSelf: "center",
                zIndex: 1,
                borderRadius: 20,
              }}
            >
              <TouchableHighlight
                onPress={() => navigation.navigate("CheckIn")}
                style={{ height: "50%", flexDirection:'column', alignItems: 'center'}}
              >
                <MaterialIcons name="assignment-ind" size={45} color="black" style={{marginTop: "10%"}}/>
              </TouchableHighlight>
              <Text style={{ alignSelf: "center", color: "black", fontSize: 24 }}>
                INICIAR TURNO
              </Text>
            </LinearGradient>
          )}

          {InfoContainer({ checkTurn: checkTurn })}
          {Divider({ text: "Historico" })}
          {InfoFullCheck({ checkFull: checkFull })}
        </>
      ) : (
        <Text style={{ alignSelf: "center", color: "black" }}>Cargando...</Text>
      )}
    </View>
  );
}
