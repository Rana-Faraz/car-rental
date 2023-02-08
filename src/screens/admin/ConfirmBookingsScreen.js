import { View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import BookingUserView from "../../components/BookingUserView";

const ConfirmBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    const docRef = query(
      collection(db, "bookings"),
      where("status", "==", "pending")
    );
    const unsub = onSnapshot(docRef, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {
          name,
          phone,
          address,
          driver,
          dropOff,
          cod,
          total,
          product,
          status,
        } = doc.data();
        list.push({
          id: doc.id,
          name,
          phone,
          address,
          driver,
          dropOff,
          cod,
          total,
          product,
          status,
        });
      });
      setBookings(list);
    });
    return unsub;
  }, []);
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
          Booked Cars
        </Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingUserView item={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default ConfirmBookingsScreen;
