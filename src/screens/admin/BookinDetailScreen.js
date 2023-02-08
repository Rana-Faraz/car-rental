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
import { ActivityIndicator, Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Carousel } from "react-native-basic-carousel";
import SpecificationCard from "../../components/SpecificationCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const BookinDetailScreen = ({ navigation, route }) => {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = React.useState(false);

  const { order } = route.params;
  const item = order.product;

  const onApprove = () => {
    setLoading(true);
    const docRef = doc(db, "bookings", order.id);

    updateDoc(
      docRef,
      {
        status: "approved",
      },
      { merge: true }
    ).then(() => {
      setLoading(false);
      navigation.goBack();
    });
  };
  const onReject = () => {
    setLoading(true);
    const docRef = doc(db, "bookings", order.id);
    updateDoc(
      docRef,
      {
        status: "denied",
      },
      { merge: true }
    ).then(() => {
      const docRef = doc(db, "cars", order.product.id);
      updateDoc(
        docRef,
        {
          isAvailable: true,
        },
        { merge: true }
      ).then(() => {
        setLoading(false);
        navigation.goBack();
      });
    });
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
            textAlign: "center",
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          Booking Detail
        </Text>
      </View>
      {!loading ? (
        <>
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
                    marginTop: 10,
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
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Booked By:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Phone Number:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.phone}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Address:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Driver Required:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.driver ? "No" : "Yes"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Drop Off:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.dropOff ? "Yes" : "No"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Total Price:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {`Rs. ${order.total}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  variant="titleMedium"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Payment:
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {order.cod ? "Cash On Delivery" : "Online Payment"}
                </Text>
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
                <SpecificationCard
                  title="Average"
                  text={`${item.mileage} Km/L`}
                />
                <SpecificationCard title="Fuel Type" text={item.fuelType} />
                <SpecificationCard title="Model" text={item.year} />
                <SpecificationCard title="Engine" text={`${item.engine} CC`} />
                <SpecificationCard
                  title="Tank"
                  text={`${item.fuelCapacity} L`}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => onApprove()}
              style={{
                backgroundColor: "black",
                padding: 20,
                borderRadius: 10,
                marginBottom: 25,
                marginHorizontal: 20,

                width: width / 2 - 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onReject()}
              style={{
                backgroundColor: "#e2252b",
                padding: 20,
                borderRadius: 10,
                marginBottom: 25,
                marginHorizontal: 20,

                width: width / 2 - 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
          <Text
            variant="titleMedium"
            style={{
              color: "black",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Changing Status
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookinDetailScreen;
