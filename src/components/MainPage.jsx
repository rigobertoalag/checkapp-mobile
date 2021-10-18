import React from "react";
import { View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { GreyContainer, SmText, InfoContainer } from "../styles/index";

export default function MainPage() {

  //Respuesta dummy de los datos del usuario
  const userData = {
    user: {
      name: "Alma Marcela",
      avatar: { uri: "https://i.pravatar.cc/300?img=16" },
      lastLogin: "15/10/2021 12:18:30",
      areLoginToday: false,
    },
  };

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#5B7FFF", "#001AFF"]}
        start={[0.1, 0.8]}
        style={{
          height: '40%',
          backgroundColor: '#5b7fff',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
        }}
      >
        <SmText>Bienvenido/a, {userData.user.name}</SmText>
        <Image
          source={userData.user.avatar}
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

      <LinearGradient
        colors={["#38CB89", "#48AC7F"]}
        start={[0.1, 0.8]}
        style={{
          height: "15%",
          width: "40%",
          position: "absolute",
          top: "32%",
          left: "20px",
          zIndex: 1,
          borderRadius: "20px",
        }}
      >
        <Text>Boton verde</Text>
      </LinearGradient>

      <LinearGradient
        colors={["#FF5630", "#E35F35"]}
        start={[0.1, 0.8]}
        style={{
          height: "15%",
          width: "40%",
          position: "absolute",
          top: "32%",
          right: "20px",
          zIndex: 1,
          borderRadius: "20px",
        }}
      >
        <Text>Boton verde</Text>
      </LinearGradient>

      <GreyContainer>
        <InfoContainer>
          <SmText>Ultimo inicio de sesion: {userData.user.lastLogin}</SmText>
        </InfoContainer>
      </GreyContainer>
    </View>
  );
}