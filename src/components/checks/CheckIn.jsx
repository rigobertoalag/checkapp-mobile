import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export default function CheckIn({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState({});

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const statusCamera = await Camera.requestPermissionsAsync();
      console.log(statusCamera.granted);
      setHasPermission(statusCamera.granted);

      const statusLocation = await Location.requestForegroundPermissionsAsync();
      console.log(statusLocation.granted);
      if (!statusLocation.granted) {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
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

    var latitude = [location.coords.latitude];
    var longitude = [location.coords.longitude];

    var fullLocation = JSON.stringify(latitude.concat(longitude));
    console.log(fullLocation);

    var form = new FormData();
    form.append("location", fullLocation);
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
          <View style={{flex: 1}}>
            <Image
              style={{ paddingTop: 420 }}
              source={{
                uri: photo.uri,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  marginTop: '10%',
                  padding: '5%',
                  width: '90%'
                }}
                onPress={postPhoto}
              >
                <Text style={{ fontSize: 24, color: "white", alignSelf: 'center' }}>INICIAR TURNO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  marginTop: '20%',
                  padding: '2%',
                  width: '50%'
                }}
                onPress={()=>setPhoto({})}
              >
                <Text style={{ fontSize: 24, color: "white", alignSelf: 'center' }}>Repetir foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
