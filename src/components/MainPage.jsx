import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, Button, Alert  } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

import { MaterialIcons } from "@expo/vector-icons";

import {
  GreyContainer,
  SmText,
  InfoContainer,
  SmTextTitle,
} from "../styles/index";

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
    Alert.alert(
      "Cerrar Sesion",
      "¿Estas seguro que deseas salir?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => logOut() }
      ]
    );


  useFocusEffect(
    React.useCallback(() => {
      getCheckTurn();
      return () => {
        setCheckTurn();
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
        <SmTextTitle>Bienvenido/a, Test</SmTextTitle>
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

      <TouchableHighlight style={{position: 'absolute', marginTop: '10%', marginLeft:'85%'}} onPress={logOutAlert} >
        <MaterialIcons name="exit-to-app" size={40} color="white" />
      </TouchableHighlight>

      {checkTurn ? (
        <>
          {checkTurn.beginTurn ? (
            <LinearGradient
              colors={["#FF5630", "#E35F35"]}
              start={[0.1, 0.8]}
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
                style={{ width: "100%", height: "100%" }}
              >
                <Text style={{ alignSelf: "center", color: "white" }}>
                  Inicar turno
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          )}

          {!checkTurn.ins && !checkTurn.outs ? (
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#777777", "#979797"]}
                start={[0.1, 0.8]}
                style={{
                  marginTop: "20%",
                  height: 85,
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      marginLeft: "5%",
                    }}
                  >
                    <MaterialIcons name="info" size={45} color="black" />
                  </View>
                  <View syle={{ width: "70%" }}>
                    <Text style={{ alignSelf: "center" }}>
                      ¡No haz marcado tu inicio de turno!
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#777777", "#979797"]}
                start={[0.1, 0.8]}
                style={{
                  marginTop: "20%",
                  height: '45%',
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      marginLeft: "5%",
                    }}
                  >
                    <MaterialIcons name="info" size={45} color="black" />
                  </View>
                  <View syle={{ width: "70%" }}>
                    <Text style={{ alignSelf: "center" }}>
                      Inicio de turno:{" "}
                      {moment(checkTurn.ins.created_at).format(
                        "DD-MM-YY hh:mm"
                      )}
                    </Text>
                    <Text style={{alignSelf: 'center', marginTop: '5%'}}>Falta realizar tu salida...</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ) }

          {/* Ultimo registro InfoContainer  */}
          <View style={{ flex: 2 }}>
            <LinearGradient
              colors={["#777777", "#979797"]}
              start={[0.1, 0.8]}
              style={{
                marginTop: "15%",
                height: "28%",
                width: "80%",
                alignSelf: "center",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "20%",
                    marginLeft: "5%",
                  }}
                >
                  <MaterialIcons name="query-builder" size={45} color="black" />
                </View>
                <View syle={{ width: "70%" }}>
                  <Text style={{ marginBottom: "5%", alignSelf: "center" }}>
                    Ultimo turno registrado{" "}
                  </Text>
                  <Text style={{ marginBottom: "5%" }}>
                    Ultima entrada: se toman del full
                  </Text>
                  <Text>Ultima salida: se toman del full </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </>
      ) : (
        <Text style={{ alignSelf: "center", color: "black" }}>Cargando...</Text>
      )}
    </View>
  );
}
