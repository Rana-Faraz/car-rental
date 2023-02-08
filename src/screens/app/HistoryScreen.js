import { Dimensions, FlatList, View } from "react-native";
import React, { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useStore } from "../../store";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CardView from "../../components/CardView";
import CarsListView from "../../components/CarsListView";
import BookingListView from "../../components/BookingListView";

const HistoryScreen = () => {
  const { height, width } = Dimensions.get("window");
  const id = useStore.getState().userId;
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    const storageRef = query(
      collection(db, "bookings"),
      where("bookedBy", "==", id)
    );
    const unsubscribe = onSnapshot(storageRef, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBookings(list);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  return (
    <SafeAreaView>
      <Text
        variant="titleLarge"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Your{" "}
        <Text
          style={{
            fontWeight: "bold",
            textDecorationLine: "underline",
            textDecorationColor: "#e6a869",
          }}
        >
          Bookings
        </Text>
      </Text>
      {loading ? (
        <View
          style={{
            height: height - 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#e6a869" />
          <Text
            style={{
              color: "#e6a869",
              marginTop: 10,
            }}
          >
            Loading
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <BookingListView item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;
