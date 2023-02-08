import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const CarsListView = ({ item, navigation, onPress }) => {
  const { height, width } = Dimensions.get("window");

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Carlist", { item })}
      disabled={!onPress}
      style={{
        backgroundColor: "white",
        width: "100%",
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // height: 220,
      }}
    >
      <View>
        <Image
          source={{ uri: item.images[0] }}
          style={{
            width: width - 40,
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              color: "black",
              marginVertical: 10,
            }}
          >
            {item.name}
          </Text>
          <Text>Rs.{item.price}/Day</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            width: "100%",
            opacity: 0.2,
          }}
        />
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="gas-station"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.mileage} kmpl
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="car-shift-pattern"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.transmitionType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="calendar-blank"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.year}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarsListView;
