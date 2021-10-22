import React from "react";
import { View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { GreyContainer, SmText, InfoContainer } from "../styles/index";
import { useSelector } from "react-redux";

export default function MainPage() {

  const credentials = useSelector(state => state.token.value)
  const staticAvatar = { uri: "https://i.pravatar.cc/300?img=17" }

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
        <Text>Boton verde</Text>
      </LinearGradient>


      <GreyContainer>
        <InfoContainer>
          <SmText>Ultimo inicio de sesion: {credentials.user.created_at}</SmText>
        </InfoContainer>
      </GreyContainer>
    </View>
  );
}
