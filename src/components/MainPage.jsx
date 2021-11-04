import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { GreyContainer, SmText, InfoContainer } from "../styles/index";

export default function MainPage({ navigation }) {
  const credentials = useSelector((state) => state.token.value);

  const [lastCheckIn, setLastCheckIn] = useState();

  const staticAvatar = { uri: "https://i.pravatar.cc/300?img=17" };

  const getLastCheckIn = async () => {
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
      let array = json.message;
      let lastCheck = array.pop();

      const formated_Date = lastCheck.created_at;
      const date = new Date(formated_Date);
      const d = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      setLastCheckIn(d);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getLastCheckIn();
      return () => {
        setLastCheckIn();
      };
    }, [])
  );

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
        <SmText>Bienvenido/a, {credentials.user.name}</SmText>
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

      {/* <TouchableHighlight >
        <LinearGradient
          colors={["#38CB89", "#48AC7F"]}
          start={[0.1, 0.8]}
          style={{
            height: "15%",
            width: "40%",
            position: "absolute",
            top: "32%",
            left: 20,
            zIndex: 1,
            borderRadius: 20,
          }}
        >
          <Text>Boton verde</Text>
        </LinearGradient>
      </TouchableHighlight> */}

      <LinearGradient
        colors={["#38CB89", "#48AC7F"]}
        start={[0.1, 0.8]}
        style={{
          height: "15%",
          width: "40%",
          position: "absolute",
          top: "32%",
          left: 20,
          zIndex: 1,
          borderRadius: 20,
        }}
      >
        <TouchableHighlight
          onPress={() => navigation.navigate("CheckIn")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text>Inicar turno</Text>
        </TouchableHighlight>
      </LinearGradient>

      <LinearGradient
        colors={["#FF5630", "#E35F35"]}
        start={[0.1, 0.8]}
        style={{
          height: "15%",
          width: "40%",
          position: "absolute",
          top: "32%",
          right: 20,
          zIndex: 1,
          borderRadius: 20,
        }}
      >
        <TouchableHighlight
          onPress={() => navigation.navigate("CheckOut")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text>Terminar turno</Text>
        </TouchableHighlight>
      </LinearGradient>

      <GreyContainer>
        <InfoContainer>
          {lastCheckIn !== "" ? (
            <SmText>Ultimo turno: {lastCheckIn}</SmText>
          ) : (
            <SmText>Cargando...</SmText>
          )}
        </InfoContainer>
      </GreyContainer>
    </View>
  );
}
