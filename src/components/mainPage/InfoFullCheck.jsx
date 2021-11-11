import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

export default function InfoFullCheck({ checkFull }) {
  if (!checkFull) {
    return (
      <View style={{ flex: 2 }}>
        <LinearGradient
          colors={["#C4C4C4", "#9c9c9c"]}
          start={[0.1, 0.3]}
          style={{
            marginTop: "5%",
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
            {checkFull ? (
              <View syle={{ width: "70%" }}>
                <Text style={{ marginBottom: "5%", alignSelf: "center" }}>
                  ¡Vaya eres nuevo, Bienvenido!
                </Text>
              </View>
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }
  return (
    <View style={{ flex: 2 }}>
      <LinearGradient
        colors={["#C4C4C4", "#9c9c9c"]}
        start={[0.1, 0.3]}
        style={{
          marginTop: "5%",
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
          {checkFull ? (
            <View syle={{ width: "70%" }}>
              <Text style={{ marginBottom: "5%", alignSelf: "center" }}>
                Ultimo turno registrado{" "}
              </Text>
              <Text style={{ marginBottom: "5%" }}>
                Inicio de turno:{" "}
                {moment(checkFull.lastCheckFull.checkInDate).format(
                  "DD-MM-YY hh:mm"
                )}
              </Text>
              <Text>
                Fin de turno:{" "}
                {moment(checkFull.lastCheckFull.checkOutDate).format(
                  "DD-MM-YY hh:mm"
                )}
              </Text>
            </View>
          ) : (
            <Text>Cargando...</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}
