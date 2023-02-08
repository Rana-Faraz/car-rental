import { TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { useStore } from "../../store";

const AdminHome = ({ navigation }) => {
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
        console.log("An error happened.", error);
      });
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Text
        variant="titleLarge"
        style={{
          textAlign: "center",
          marginTop: 20,
          textTransform: "uppercase",
        }}
      >
        Admin View
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("ConfirmBookings")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="user" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            Confirm Bookings
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ApprovedBooking")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="user-check" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            Approved Bookings
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("RejectedBooking")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="user-x" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            Rejected Bookings
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AllCars")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="car-sport-outline" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            All Cars
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AvailableCars")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="car-sport-outline" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            Available Cars
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCars")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="plus" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 10,
              marginLeft: 34,
            }}
          >
            Add Cars
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ececec",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}
          >
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminHome;
