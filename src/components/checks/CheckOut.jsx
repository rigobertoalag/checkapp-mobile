import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";

export default function CheckOut({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState({});

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

  const takePhoto = async () => {
    if (this.camera) {
      const options = { quality: 0.7, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      setPhoto(photo);
      console.log(photo.uri);
    }
  };

  const postPhoto = () => {
    var imageForm = {
      uri: photo.uri,
      type: "image/jpeg",
      name: "image.jpg",
    };

    var form = new FormData();
    form.append("location", "testereo"); //codigo duro
    form.append("image", imageForm);

    return fetch("https://lara-api-sanctum.herokuapp.com/api/checkin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 145|OhWnjbdmyfWCGKVwlVkw2DpVP61uJ3erpsgFSAm5", //codigo duro
      },
      body: form,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("registro exitoso", json);
        navigation.navigate("MainPage");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", flex: 2 }}>
        <Text style={{ fontSize: 48, alignSelf: "center" }}>Hola</Text>

        {!photo.uri ? (
          <>
            <Camera
              style={{ paddingTop: 420 }}
              type={Camera.Constants.Type.front}
              ref={(ref) => {
                //Con esta funcion podemos hacer que los metodos de takePictureAsync se habiliten
                this.camera = ref;
              }}
            ></Camera>
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
                onPress={takePhoto}
              ></TouchableOpacity>
            </View>
          </>
        ) : (
          <>
          <Image
            style={{ paddingTop: 420 }}
            source={{
              uri: photo.uri,
            }}
          />
          <Button title="Enviar" onPress={postPhoto} />
          </>
        )}
      </View>
    </View>
  );
}
