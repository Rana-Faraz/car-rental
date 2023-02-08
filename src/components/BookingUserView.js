import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "react-native-paper";

const BookingUserView = ({ item, navigation }) => {
  const { width } = Dimensions.get("window");
  const car = item.product;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookingDetail", { order: item })}
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
          source={{ uri: car.images[0] }}
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
        <Text
          variant="titleMedium"
          style={{
            color: "black",
            marginTop: 10,
          }}
        >
          {car.name}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            width: "100%",
            opacity: 0.2,
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              variant="titleSmall"
              style={{
                color: "black",
                marginBottom: 10,
              }}
            >
              Book By: {item.name}
            </Text>
            <Text
              variant="titleSmall"
              style={{
                color: "black",
                marginBottom: 10,
              }}
            >
              Phone Number: {item.phone}
            </Text>
          </View>
          <View>
            <Text
              variant="titleSmall"
              style={{
                color: "black",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {`Rs. ${item.total}`}
            </Text>
            <Text
              variant="titleSmall"
              style={{
                color: "black",
                marginBottom: 10,
              }}
            >
              {item.cod ? "Cash on Delivery" : "Online Payment"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingUserView;
