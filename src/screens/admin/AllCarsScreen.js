import { View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator, Text } from "react-native-paper";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import CarsListView from "../../components/CarsListView";

const AvailableCarsScreen = ({ navigation }) => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const storageRef = query(
      collection(db, "cars"),
      where("isDeleted", "==", false)
    );

    onSnapshot(storageRef, (querySnapshot) => {
      const car = [];
      querySnapshot.forEach((doc) => {
        car.push({ ...doc.data() });
      });
      setCars(car);
      setLoading(true);
    });
    // let car = [];
    // getDocs(storageRef)
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       car.push({ ...doc.data() });
    //     });
    //   })
    //   .then(() => {
    //     setCars(car);
    //     setLoading(true);
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //   });
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
          All Cars
        </Text>
      </View>
      {cars.length === 0 && loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            No Cars Available
          </Text>
        </View>
      ) : null}
      {loading ? (
        <FlatList
          data={cars}
          renderItem={({ item }) => (
            <CarsListView item={item} onPress={true} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color="#000" animating />
          <Text
            style={{
              marginTop: 10,
            }}
          >
            Loading...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AvailableCarsScreen;
