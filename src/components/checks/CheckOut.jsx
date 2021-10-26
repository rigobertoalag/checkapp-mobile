import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";

export default function CheckOut() {
  const [hasPermission, setHasPermission] = useState(null);
  const camera = Camera
//   const [type, setType] = useState(Camera.Constants.Type.front); Se deshabilita ya que por default es la camara frontal

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

//   const takePicture = async () => {
//     if (!Camera) return
//     const photo = await Camera.takePictureAsync()
//     console.log(photo)
//   }

const takePicture = async () => {
    if (camera) {
        const options = { quality: 0.7, base64: true };
        const data = await camera.takePictureAsync(options);
        const source = data.base64;
        console.log(source)
    
        // if (source) {
        //   await cameraRef.current.pausePreview();
        //   setIsPreview(true);
        // }
      }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", flex: 2 }}>
        <Text style={{ fontSize: 48, alignSelf: "center" }}>Hola</Text>
        <Camera style={{ paddingTop: 420 }} type={Camera.Constants.Type.front}>
        <Text style={{ fontSize: 64, color: "white" }} onPress={() => takePicture()}> Tomar foto </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              margin: 20,
            }}
          >
            {/* Habilita el boton para cambiar de camara trasera o delantera por requermiento debe ser la frontal */}
            {/* <TouchableOpacity
            style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.front
                  ? Camera.Constants.Type.back
                  : Camera.Constants.Type.front
              );
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}> Flip </Text>
          </TouchableOpacity> */}
          </View>
        </Camera>
        <View
          style={{
            backgroundColor: "gray",
            height: 80,
            width: 80,
            borderRadius: 100,
            alignSelf: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              height: 70,
              width: 70,
              borderRadius: 100,
              alignSelf: "center",
              marginTop: 5,
            }}
            onPress={() => takePicture()}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
