import { View, Text } from "react-native";
import React from "react";
import { Toaster } from "react-native-customizable-toast";

const ToasterView = () => {
  return (
    <View style={{ position: "absolute", top: 50, width: "100%" }}>
      <Toaster />
    </View>
  );
};

export default ToasterView;
