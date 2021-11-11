import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

export default function InfoContainer({ checkTurn }) {
  console.log("desde test", checkTurn);
  if (!checkTurn.ins && !checkTurn.outs) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#C4C4C4", "#9c9c9c"]}
          start={[0.1, 0.3]}
          style={{
            marginTop: "20%",
            height: "45%",
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
    );
  } else if (checkTurn.ins && !checkTurn.outs) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#C4C4C4", "#9c9c9c"]}
          start={[0.1, 0.3]}
          style={{
            marginTop: "20%",
            height: "45%",
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
                {moment(checkTurn.ins.created_at).format("DD-MM-YY hh:mm")}
              </Text>
              <Text style={{ alignSelf: "center", marginTop: "5%" }}>
                Falta realizar tu salida...
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  } else if (checkTurn.ins && checkTurn.outs) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#C4C4C4", "#9c9c9c"]}
          start={[0.1, 0.3]}
          style={{
            marginTop: "20%",
            height: "45%",
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
              <MaterialIcons name="assignment-turned-in" size={45} color="black" />
            </View>
            <View syle={{ width: "70%" }}>
              <Text style={{ alignSelf: "center" }}>¡PERFECTO!</Text>
              <Text>Ya tienes un turno completo,</Text>
              <Text>inicia uno nuevo si asi lo quieres.</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
