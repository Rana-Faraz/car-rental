import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Switch, Text } from "react-native-paper";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useStore } from "../../store";

const PaymentTypeScreen = ({ navigation, route }) => {
  const { item, driver, dropOff, name, phone, address } = route.params;
  const [driverPrice, setDriverPrice] = React.useState(driver ? 500 : 0);
  const [dropOffPrice, setDropOffPrice] = React.useState(dropOff ? 500 : 0);
  const [tax, setTax] = React.useState(
    (Number(item.price) + Number(driverPrice) + Number(dropOffPrice)) * 0.13
  );
  const id = useStore.getState().userId;
  const [total, setTotal] = React.useState(0);
  const [cod, setCod] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (driver) {
      setDriverPrice(500);
    }
    if (dropOff) {
      setDropOffPrice(500);
    }
    const tot =
      Number(item.price) +
      Number(driverPrice) +
      Number(dropOffPrice) +
      Number(tax);
    setTotal(tot);
  }, [driver, dropOff]);
  const { width, height } = Dimensions.get("window");

  const postBooking = () => {
    setLoading(true);
    const data = {
      name: name,
      phone: phone,
      address: address,
      driver: driver,
      dropOff: dropOff,
      cod: cod,
      total: total,
      product: item,
      status: "pending",
      bookedBy: id,
      driverPrice: driverPrice,
      dropOffPrice: dropOffPrice,
      tax: tax,
      price: item.price,
    };
    const storageRef = collection(db, "bookings");

    addDoc(storageRef, data)
      .then((documentSnapshot) => {
        const docRef = doc(db, "bookings", documentSnapshot.id);
        updateDoc(
          docRef,
          {
            id: documentSnapshot.id,
          },
          { merge: true }
        )
          .then(() => {
            const docRef = doc(db, "cars", item.id);
            updateDoc(
              docRef,
              {
                isAvailable: false,
              },
              { merge: true }
            );
          })
          .then(
            () => setLoading(false),
            navigation.navigate("Booking Done", {
              item,
              driver,
              dropOff,
              name,
              phone,
              address,
              cod,
            })
          );
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
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
            {`Rs.${driverPrice}`}
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
            {`Rs.${dropOffPrice}`}
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
            {`Rs.${tax}`}
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
            {`Rs.${total}`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View>
            <Text variant="titleMedium">Cash on Delivery</Text>
          </View>

          <Switch
            disabled={loading}
            value={cod}
            onValueChange={() => {
              setCod(!cod);
            }}
            color="black"
            style={{ marginVertical: 10 }}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          cod
            ? postBooking()
            : navigation.navigate("Payment", {
                item,
                driver,
                dropOff,
                name,
                phone,
                address,
                cod,
                total,
                driverPrice,
                dropOffPrice,
                tax,
              });
        }}
        style={{
          backgroundColor: "black",
          padding: 20,
          borderRadius: 10,
          marginBottom: 25,
          marginHorizontal: 20,
          position: "absolute",
          bottom: 0,
          width: width - 40,
          opacity: loading ? 0.5 : 1,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentTypeScreen;
