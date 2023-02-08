import { View, Dimensions, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { RadioButton, Switch, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const BookingScreen = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;
  const [driver, setDriver] = React.useState(false);
  const [dropOff, setDropOff] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginHorizontal: 10 }}
        onScroll={() => Keyboard.dismiss()}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              color: "black",
              marginVertical: 10,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              color: "black",
              marginVertical: 10,
              fontWeight: "bold",
            }}
          >
            {`Rs.${item.price}/Day`}
          </Text>
        </View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          mode="outlined"
          keyboardType="number-pad"
          maxLength={11}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          mode="outlined"
          multiline
          style={{ marginVertical: 10 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View>
            <Text variant="titleMedium">Include Driver</Text>
            <Text variant="titleSmall">
              *Adding the driver will cost extra.
            </Text>
          </View>
          <Switch
            value={driver}
            onValueChange={() => {
              setDriver(!driver);
            }}
            color="black"
            style={{ marginVertical: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View>
            <Text variant="titleMedium">Pick Up</Text>
            <Text variant="titleSmall">
              *You will pick up the car from the owner.
            </Text>
          </View>

          <Switch
            value={!dropOff}
            onValueChange={() => {
              setDropOff(!dropOff);
            }}
            color="black"
            style={{ marginVertical: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View>
            <Text variant="titleMedium">Drop Off</Text>
            <Text variant="titleSmall">
              *The owner will drop off the car to your location.
            </Text>
          </View>

          <Switch
            value={dropOff}
            onValueChange={() => {
              setDropOff(!dropOff);
            }}
            color="black"
            style={{ marginVertical: 10 }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={
          name.length === 0 || phone.length === 0 || address.length === 0
        }
        onPress={() =>
          navigation.navigate("Payment Type", {
            item,
            driver,
            dropOff,
            name,
            phone,
            address,
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
          opacity:
            name.length === 0 || phone.length === 0 || address.length === 0
              ? 0.5
              : 1,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingScreen;
