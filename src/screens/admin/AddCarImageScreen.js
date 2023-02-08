import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Carousel } from "react-native-basic-carousel";
import { auth, storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCarImageScreen = ({ navigation, route }) => {
  const { carName, carModel, carEngine, carFuel, fuelType, carMileage } =
    route.params;
  const { height, width } = Dimensions.get("window");
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    image.forEach(async (i, _i) => {
      const data = await fetch(i);
      const blob = await data.blob();
      const storageRef = ref(
        storage,
        `images/${auth.currentUser.uid}/${carName}-${carModel}-${_i}`
      );
      const upload = await uploadBytes(storageRef, blob, {
        contentType: "image/jpeg",
      })
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImages((prev) => [...prev, url]);
            })
            .catch((e) => {
              setUploading(false);
              console.log(e);
            });
        })
        .catch((e) => {
          setUploading(false);
          console.log(e);
        });
    });
  };
  useEffect(() => {
    if (image.length === images.length && images.length > 0) {
      setUploading(false);
      navigation.navigate("CarPrice", {
        images,
        carName,
        carModel,
        carEngine,
        carFuel,
        fuelType,
        carMileage,
      });
    }
  }, [images]);
  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingVertical: 10,
          }}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          Add Car Images
        </Text>
      </View>
      {uploading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
          <Text style={{ marginTop: 10 }}>Uploading...</Text>
        </View>
      ) : (
        <>
          <Button onPress={pickImage} mode="contained">
            Select Image
          </Button>
          <View
            style={{
              marginTop: 20,
            }}
          >
            {image.length > 0 && (
              <Carousel
                itemWidth={width - 40}
                data={image}
                pagination={true}
                renderItem={({ item, index }) => (
                  <>
                    <Image
                      style={{ width: width - 40, height: 200 }}
                      source={{ uri: item }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => setImage(image.filter((i) => i !== item))}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 5,
                      }}
                    >
                      <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                  </>
                )}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => uploadImage()}
            style={{
              backgroundColor: "black",
              padding: 20,
              borderRadius: 10,
              marginBottom: 25,
              marginHorizontal: 20,
              position: "absolute",
              bottom: 0,
              width: width - 40,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              {`Next`}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default AddCarImageScreen;
