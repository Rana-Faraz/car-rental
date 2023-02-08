import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const BookingListView = ({ item, navigation, onPress }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Carlist", { item })}
      disabled={!onPress}
      style={{
        backgroundColor: "white",
        width: "100%",
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // height: 220,
      }}
    >
      <View>
        <Image
          source={{ uri: item.product.images[0] }}
          style={{
            width: width - 40,
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              color: "black",
              marginVertical: 10,
            }}
          >
            {item.product.name}
          </Text>
          <Text>Rs.{item.product.price}/Day</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            width: "100%",
            opacity: 0.2,
          }}
        />
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="gas-station"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.product.mileage} kmpl
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="car-shift-pattern"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.product.transmitionType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="calendar-blank"
              size={20}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {item.product.year}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            width: "100%",
            opacity: 0.2,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="titleMedium">Booking Status:</Text>
          <View
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                backgroundColor:
                  item.status === "pending"
                    ? "orange"
                    : item.status === "approved"
                    ? "green"
                    : "red",
                height: 10,
                width: 10,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text
              variant="titleMedium"
              style={{
                textTransform: "capitalize",
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            width: "100%",
            opacity: 0.2,
            marginVertical: 10,
          }}
        />
        <View>
          <Text
            variant="titleLarge"
            style={{
              color: "black",
              marginVertical: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Receipt
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              Product Name
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              Total Price
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              Rent Price per day:
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              {`Rs.${item.price}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              Driver:
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              {`Rs.${item.driverPrice}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              Drop Off:
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              {`Rs.${item.dropOffPrice}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              Tax(13%):
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              {`Rs.${item.tax}`}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "black",
              opacity: 0.2,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              Total:
            </Text>
            <Text
              variant="titleMedium"
              style={{
                color: "black",
                marginVertical: 10,
              }}
            >
              {`Rs.${item.total}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingListView;
