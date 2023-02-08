import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import CardView from "../../components/CardView";
import DropDown from "react-native-paper-dropdown";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useStore } from "../../store";

const PaymentPage = ({ route, navigation }) => {
  const {
    item,
    dropOff,
    driver,
    name,
    cod,
    phone,
    address,
    total,
    driverPrice,
    dropOffPrice,
    tax,
    price,
  } = route.params;
  const { width } = Dimensions.get("window");
  const id = useStore.getState().userId;
  const [cardType, setCardType] = React.useState("visa");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardHolder, setCardHolder] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
      price: price,
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
  useEffect(() => {
    console.log(cardType);
  }, [cardType]);

  const cards = [
    {
      label: "Visa",
      value: "visa",
    },
    {
      label: "Mastercard",
      value: "mastercard",
    },
  ];
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{
        flex: 1,
      }}
    >
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
          }}
        >
          <CardView
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            expiryDate={expiryDate}
            cardType={cardType}
          />
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <DropDown
              label={"Card Type"}
              mode={"outlined"}
              value={cardType}
              setValue={setCardType}
              list={cards}
              visible={showDropDown}
              showDropDown={() => {
                setShowDropDown(true);
              }}
              onDismiss={() => {
                setShowDropDown(false);
              }}
            />
            <TextInput
              label="Card Holder"
              value={cardHolder}
              onChangeText={(text) => setCardHolder(text)}
              mode="outlined"
              style={{
                marginTop: 10,
              }}
            />
            <TextInput
              label="Card Number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
              keyboardType="numeric"
              maxLength={16}
              mode="outlined"
              style={{
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                label="Expiry Date"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
                mode="outlined"
                style={{
                  marginTop: 10,
                  width: width / 2 - 20,
                }}
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={(text) => setCvv(text)}
                mode="outlined"
                keyboardType="numeric"
                maxLength={3}
                style={{
                  marginTop: 10,
                  width: width / 2 - 20,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            postBooking();
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
            {`Pay Rs.${item.price}`}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PaymentPage;
