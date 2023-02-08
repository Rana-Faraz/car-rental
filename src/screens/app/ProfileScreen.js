import { TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { useStore } from "../../store";

const ProfileScreen = ({ navigation }) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        useStore.setState({ userId: "", isAdmin: false, email: "" });
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened.");
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#2c2c2c",
      }}
    >
      <Text
        variant="titleLarge"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        Profile
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("HistoryScreen")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "#ececec",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <MaterialIcons name="history" size={24} color="white" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
              color: "#fff",
            }}
          >
            Booking Status
          </Text>
        </View>
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "#ececec",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <Ionicons name="exit-outline" size={24} color="white" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
              color: "#fff",
            }}
          >
            Log Out
          </Text>
        </View>
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
