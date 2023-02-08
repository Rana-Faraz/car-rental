import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const SpecificationCard = ({ title, text }) => {
  const { width } = Dimensions.get("window");
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: "center",
        width: width / 2 - 20,
        paddingVertical: 40,
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default SpecificationCard;
