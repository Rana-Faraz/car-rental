import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Searchbar,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { cars } from "../../../assets/data/cars";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import CarsListView from "../../components/CarsListView";
import UserAvatar from "react-native-user-avatar";

const HomeScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const email = useStore((state) => state.email);
  const theme = useTheme();
  const Navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storageRef = query(
      collection(db, "cars"),
      where("isDeleted", "==", false),
      where("isAvailable", "==", true)
    );

    const unsub = onSnapshot(storageRef, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setCarList(list);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const results = carList.filter((car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);
  return (
    <View
      style={{
        backgroundColor: "#ececec",
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: 40, height: 40 }} />
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Let's find your{" "}
          <Text
            style={{
              fontWeight: "bold",
              textDecorationLine: "underline",
              textDecorationColor: "#e6a869",
            }}
          >
            car
          </Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <UserAvatar size={40} name={email} style={{ width: 40 }} />
        </TouchableOpacity>
      </View>
      <Searchbar
        elevation={0}
        placeholder="Search"
        icon={() => <Ionicons name="search" size={24} color="black" />}
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
          backgroundColor: "#ececec",
          borderBottomWidth: 1,
          borderBottomColor: "#e6a869",
        }}
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
      />

      <View>
        <FlatList
          data={cars}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSearchQuery(item)}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            marginTop: 20,
            // marginHorizontal: 20,
          }}
        />
      </View>

      <Text
        variant="titleMedium"
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          fontWeight: "bold",
        }}
      >
        {searchQuery ? searchQuery : "All Cars"}
      </Text>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            variant="titleMedium"
            style={{
              marginTop: 10,
            }}
          >
            Loading
          </Text>
        </View>
      ) : carList.length > 0 ? (
        <FlatList
          data={searchQuery ? searchResults : carList}
          onScroll={() => Keyboard.dismiss()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CarsListView item={item} navigation={navigation} onPress={true} />
          )}
          contentContainerStyle={{
            marginHorizontal: 20,
          }}
        />
      ) : (
        <View
          style={{
            height: height - 400,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            No Cars Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardContainer: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  card: {
    width: "90%",
    height: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 10,
  },
});
