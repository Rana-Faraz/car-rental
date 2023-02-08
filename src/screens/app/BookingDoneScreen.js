import { Dimensions, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import CarsListView from "../../components/CarsListView";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions } from "@react-navigation/native";

const BookingDoneScreen = ({ route, navigation }) => {
  const { item, driver, dropOff, cod } = route.params;
  const { width, height } = Dimensions.get("window");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#2c2c2c",
        paddingHorizontal: 20,
      }}
    >
      <StatusBar style="light" />

      <Text
        variant="titleLarge"
        style={{
          color: "white",
          marginVertical: 10,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Order Placed
      </Text>
      <CarsListView item={item} onPress={false} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          variant="titleSmall"
          style={{
            color: "white",
            marginVertical: 10,
          }}
        >
          Driver: {driver ? "Yes" : "No"}
        </Text>
        <Text
          variant="titleSmall"
          style={{
            color: "white",
            marginVertical: 10,
          }}
        >
          Drop Off: {dropOff ? "Yes" : "No"}
        </Text>
        <Text
          variant="titleSmall"
          style={{
            color: "white",
            marginVertical: 10,
          }}
        >
          Payment: {cod ? "Cash on delivery" : "Debit/Credit Card"}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "white",
          marginVertical: 10,
        }}
      />
      <Text
        variant="titleSmall"
        style={{
          color: "white",
          marginVertical: 10,
          textAlign: "center",
        }}
      >
        {dropOff
          ? "The car will be delivered to your doorstep within 5 hours."
          : "You can pick up the car from our warehouse any time with in 2 days."}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.popToTop())}
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
          Back to home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingDoneScreen;
