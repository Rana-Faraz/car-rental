import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const AddCarScreen = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const [fuelType, setFuelType] = React.useState();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [carName, setCarName] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carEngine, setCarEngine] = React.useState("");
  const [carFuel, setCarFuel] = React.useState("");
  const [carMileage, setCarMileage] = React.useState("");

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
          Add Cars
        </Text>
      </View>
      <TextInput
        label="Car Name"
        value={carName}
        onChangeText={(text) => setCarName(text)}
        placeholder="Eg. Honda City, Maruti Swift, etc."
        mode="outlined"
        style={{
          marginVertical: 10,
        }}
      />
      <TextInput
        label="Car Model"
        value={carModel}
        onChangeText={(text) => setCarModel(text)}
        placeholder="Eg. 2019, 2020, etc."
        keyboardType="numeric"
        mode="outlined"
        style={{
          marginVertical: 10,
        }}
      />
      <TextInput
        label="Engine CC"
        value={carEngine}
        onChangeText={(text) => setCarEngine(text)}
        placeholder="Eg. 1500, 2000, etc."
        mode="outlined"
        style={{
          marginVertical: 10,
        }}
      />
      <DropDown
        label={"Fuel Type"}
        mode={"outlined"}
        value={fuelType}
        setValue={setFuelType}
        list={[
          { label: "Petrol", value: "Petrol" },
          { label: "Diesel", value: "Diesel" },
          { label: "CNG", value: "CNG" },
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
        label="Fuel Tank Capacity"
        value={carFuel}
        onChangeText={(text) => setCarFuel(text)}
        placeholder="Eg. 40, 50, etc."
        mode="outlined"
        keyboardType="numeric"
        style={{
          marginVertical: 10,
        }}
      />
      <TextInput
        label="Fuel Average"
        value={carMileage}
        onChangeText={(text) => setCarMileage(text)}
        placeholder="Eg. 40, 50, etc."
        mode="outlined"
        keyboardType="numeric"
        style={{
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CarImage", {
            carName,
            carModel,
            carEngine,
            carFuel,
            fuelType,
            carMileage,
          })
        }
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
    </SafeAreaView>
  );
};

export default AddCarScreen;
