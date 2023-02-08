import {
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
import { FontAwesome5 } from "@expo/vector-icons";

const CarListScreen = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { item } = route.params;
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginLeft: 10,
          paddingVertical: 10,
        }}
      >
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Book", { item })}
        style={{
          backgroundColor: "black",
          padding: 20,
          borderRadius: 10,
          marginBottom: 25,
          marginHorizontal: 20,
          position: "absolute",
          bottom: 40,
          width: width - 40,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Book Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CarListScreen;

const styles = StyleSheet.create({});
