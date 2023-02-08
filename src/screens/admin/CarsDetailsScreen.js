import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Carousel } from "react-native-basic-carousel";
import SpecificationCard from "../../components/SpecificationCard";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

const CarsDetailsScreen = ({ navigation, route }) => {
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;
  const storageRef = doc(db, "cars", item.id);

  const deleteCar = () => {
    Alert.alert("Delete Car", "Are you sure you want to delete this car?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setDoc(
            storageRef,
            {
              isDeleted: true,
            },
            { merge: true }
          )
            .then(() => navigation.navigate("Homescreen"))
            .catch((error) => {
              console.error("Error removing document: ", error.code);
            });
        },
      },
    ]);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
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
            color: "black",
            marginVertical: 10,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => deleteCar()}
          style={{
            marginLeft: 10,
            paddingVertical: 10,
          }}
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Carousel
          itemWidth={width}
          data={item.images}
          pagination={true}
          renderItem={({ item }) => (
            <Image
              style={{ width: "100%", height: 200 }}
              source={{ uri: item }}
              resizeMode="cover"
            />
          )}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                color: "black",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <Text variant="titleMedium">Rs.{item.price}/Day</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingBottom: 100,
            }}
          >
            <SpecificationCard
              title="Transmission"
              text={item.transmitionType}
            />
            <SpecificationCard title="Average" text={`${item.mileage} Km/L`} />
            <SpecificationCard title="Fuel Type" text={item.fuelType} />
            <SpecificationCard title="Model" text={item.year} />
            <SpecificationCard title="Engine" text={`${item.engine} CC`} />
            <SpecificationCard title="Tank" text={`${item.fuelCapacity} L`} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarsDetailsScreen;
