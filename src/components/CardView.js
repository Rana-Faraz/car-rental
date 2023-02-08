import { View, Image } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const CardView = (props) => {
  const { cardNumber, cardHolder, expiryDate, cardType } = props;
  return (
    <View
      style={{
        backgroundColor: cardType == "mastercard" ? "#2c2c2c" : "#0098ff",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        height: 230,
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
      }}
    >
      {cardType === "mastercard" ? (
        <Image
          source={require("../../assets/images/masterCard.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/images/visaCard.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
      )}

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          position: "absolute",

          bottom: 100,
          left: 30,
        }}
      >
        {cardHolder ? cardHolder : "Card Holder"}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          position: "absolute",
          bottom: 50,
          left: 30,
        }}
      >
        {cardNumber ? cardNumber : "XXXX XXXX XXXX XXXX"}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          position: "absolute",
          bottom: 20,
          left: 30,
        }}
      >
        {expiryDate ? expiryDate : "MM/YY"}
      </Text>
    </View>
  );
};

export default CardView;
