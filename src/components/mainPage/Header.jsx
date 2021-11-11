import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { SmTextTitle } from "../../styles/index";

export default function Header({ userName }) {
  const staticAvatar = { uri: "https://i.pravatar.cc/300?img=17" };

  return (
    <>
      <LinearGradient
        colors={["#5B7FFF", "#001AFF"]}
        start={[0.1, 0.3]}
        style={{
          height: "40%",
          backgroundColor: "#5b7fff",
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}
      >
        <SmTextTitle>Bienvenido/a, {userName}</SmTextTitle>
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
    </>
  );
}
