import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

import { GreyContainer, SmText, InfoContainer, SmTextTitle } from "../styles/index";

export default function MainPage({ navigation }) {
  const credentials = useSelector((state) => state.token.value);

  const [checkTurn, setCheckTurn] = useState();

  const staticAvatar = { uri: "https://i.pravatar.cc/300?img=17" };

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

  useFocusEffect(
    React.useCallback(() => {
      getCheckTurn();
      return () => {
        setCheckTurn();
      };
    }, [])
  );

  console.log("checkTurn DDDD", checkTurn);

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#5B7FFF", "#001AFF"]}
        start={[0.1, 0.8]}
        style={{
          height: "40%",
          backgroundColor: "#5b7fff",
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}
      >
        <SmTextTitle>Bienvenido/a, {credentials.user.name}</SmTextTitle>
        <Image
          source={staticAvatar}
          style={{
            width: 156,
            height: 156,
            borderRadius: 100,
            alignSelf: "center",
            top: "30%",
            position: "absolute",
          }}
        />
      </LinearGradient>

      {checkTurn ? (
        <>
          {checkTurn.beginTurn ? (
            <LinearGradient
              colors={["#FF5630", "#E35F35"]}
              start={[0.1, 0.8]}
              style={{
                height: "15%",
                width: "70%",
                position: "absolute",
                top: "32%",
                alignSelf: "center",
                zIndex: 1,
                borderRadius: 20,
              }}
            >
              <TouchableHighlight
                onPress={() => navigation.navigate("CheckOut")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={{ alignSelf: "center", color: "white" }}>
                  Terminar turno
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={["#38CB89", "#48AC7F"]}
              start={[0.1, 0.8]}
              style={{
                height: "15%",
                width: "70%",
                position: "absolute",
                top: "32%",
                alignSelf: "center",
                zIndex: 1,
                borderRadius: 20,
              }}
            >
              <TouchableHighlight
                onPress={() => navigation.navigate("CheckIn")}
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={{ alignSelf: "center", color: "white" }}>
                  Inicar turno
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          )}
          <GreyContainer>
            <InfoContainer>
              {!checkTurn.ins && !checkTurn.outs ? (
                <SmText>
                  ¡Buen día!, aun no haz iniciado ningun turno el dia de hoy.
                </SmText>
              ) : checkTurn.ins && !checkTurn.outs ? (
                <SmText>
                  Inicio de turno: {moment(checkTurn.ins.created_at).format("DD-MM-YY")}, falta realizar tu salida...
                </SmText>
              ) : (
                <SmText>
                  Ultimo inicio: {moment(checkTurn.ins.created_at).format("DD-MM-YY mm:ss")}, ultima salida: {moment(checkTurn.outs.created_at).format("DD-MM-YY mm:ss")}
                </SmText>
              )}
            </InfoContainer>
          </GreyContainer>
        </>
      ) : (
        <Text style={{ alignSelf: "center", color: "black" }}>Cargando...</Text>
      )}
    </View>
  );
}
