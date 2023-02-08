import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { CommonActions, StackActions } from "@react-navigation/native";

const AddCarPrice = ({ navigation, route }) => {
  const { width, height } = Dimensions.get("window");
  const [price, setPrice] = React.useState("");
  const [transmission, setTransmission] = React.useState();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const {
    carName,
    carModel,
    carEngine,
    carFuel,
    fuelType,
    carMileage,
    images,
  } = route.params;

  const handleUpload = async () => {
    const storageRef = collection(db, "cars");
    await addDoc(storageRef, {
      name: carName,
      mileage: carMileage,
      fuelType: fuelType,
      year: carModel,
      engine: carEngine,
      price: price,
      images: images,
      transmitionType: transmission,
      fuelCapacity: carFuel,
      isDeleted: false,
      isAvailable: true,
    })
      .then((documentSnapshot) => {
        const docRef = doc(db, "cars", documentSnapshot.id);
        updateDoc(
          docRef,
          {
            id: documentSnapshot.id,
          },
          { merge: true }
        ).then(() => navigation.dispatch(StackActions.popToTop()));
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
          Add Car Price
        </Text>
      </View>

      <DropDown
        label={"Transmission"}
        mode={"outlined"}
        value={transmission}
        setValue={setTransmission}
        list={[
          { label: "Automatic", value: "Automatic" },
          { label: "Manual", value: "Manual" },
        ]}
        visible={showDropDown}
        showDropDown={() => {
          setShowDropDown(true);
        }}
        onDismiss={() => {
          setShowDropDown(false);
        }}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        placeholder="in PKR"
        mode="outlined"
        style={{
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => handleUpload()}
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
          {`Post Car for Rent`}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddCarPrice;
