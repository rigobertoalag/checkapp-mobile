import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { MainContainer } from "../styles/index";

export default function MainPage() {
  const userData = {
    user: {
      name: "Rigo",
      avatar: { uri: "https://i.pravatar.cc/300?img=16" },
      lastLogin: "15/10/2021 12:18:30",
      areLoginToday: false,
    },
  };

  return (
    <View style={{ height: "100%" }}>
      {/* <BigBlueContainer>
        <SmText>Bienvenido, {userData.user.name}</SmText>
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
      </BigBlueContainer> */}
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
        <SmText>Bienvenido, {userData.user.name}</SmText>
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

      {/* <CheckInButton>
        <Text>Boton verde</Text>
      </CheckInButton> */}

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

      {/* <CheckOutButton>
        <Text>Boton rojo</Text>
      </CheckOutButton> */}

      <GreyContainer>
        <InfoContainer>
          <SmText>Ultimo inicio de sesion: {userData.user.lastLogin}</SmText>
        </InfoContainer>
      </GreyContainer>
    </View>
  );
}

const BigBlueContainer = styled.View`
  height: 40%;
  background-color: #5b7fff;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const CheckInButton = styled.View`
  height: 15%;
  width: 40%;
  position: absolute;
  top: 32%;
  left: 20px;
  /* background-color: rgba(56, 203, 137, 1); */
  z-index: 1;
  border-radius: 20px;
  elevation: 1;
`;

// const CheckOutButton = styled.View`
//   height: 15%;
//   width: 40%;
//   position: absolute;
//   top: 32%;
//   right: 20px;
//   background-color: "rgba(255, 86, 48, 1)";
//   z-index: 1;
//   border-radius: 20px;
//   elevation: 1;
// `;

const GreyContainer = styled.View`
  height: 60%;
  z-index: 0;
  padding-top: 25%;
  align-items: center;
  elevation: 0;
`;

const InfoContainer = styled.View`
  height: 25%;
  width: 90%;
  border-radius: 20px;
  background-color: #c4c4c4;
`;

const SmText = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  margin-top: 15%;
  color: rgba(250, 250, 250, 0.9); ;
`;
// const CircleAvatarContainer = styled.View`
// position: absolute;
// width: 156px;
// height: 156px;
// top: 30%;
// background-color: grey;
// border-radius: 100px;
// align-self: center;
// `
