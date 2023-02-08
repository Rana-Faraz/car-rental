import { View, Text, Dimensions, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import DropDown from "react-native-paper-dropdown";

const CompareCarsScreen = () => {
  const { height, width } = Dimensions.get("window");
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [car1, setCar1] = useState("");
  const [car1Data, setCar1Data] = useState({});
  const [bothSelected, setBothSelected] = useState(false);

  const [car2, setCar2] = useState("");
  const [car2Data, setCar2Data] = useState({});
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
    const data = carList.map((item) => {
      return { label: item.name, value: item.name };
    });
    setDropdownData(data);
  }, [carList]);

  useEffect(() => {
    const data = carList.find((item) => item.name === car1);
    setCar1Data(data);
  }, [car1]);

  useEffect(() => {
    const data = carList.find((item) => item.name === car2);
    setCar2Data(data);
  }, [car2]);

  useEffect(() => {
    if (car1 && car2) {
      setBothSelected(true);
    } else {
      setBothSelected(false);
    }
  }, [car1, car2]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            width: width / 2 - 20,
          }}
        >
          <DropDown
            label={"Select Car"}
            mode={"outlined"}
            value={car1}
            setValue={setCar1}
            list={dropdownData}
            visible={dropdown}
            showDropDown={() => {
              setDropdown(true);
            }}
            onDismiss={() => {
              setDropdown(false);
            }}
          />
        </View>
        <View
          style={{
            width: width / 2 - 20,
          }}
        >
          <DropDown
            label={"Select Car"}
            mode={"outlined"}
            value={car2}
            setValue={setCar2}
            list={dropdownData}
            visible={dropdown2}
            showDropDown={() => {
              setDropdown2(true);
            }}
            onDismiss={() => {
              setDropdown2(false);
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "black",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      />
      {bothSelected ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Image
                source={{ uri: car1Data.images[0] }}
                style={{ width: width / 2, height: 110 }}
                resizeMode="cover"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {car1Data.name}
              </Text>
            </View>
            <View>
              <Image
                source={{ uri: car2Data.images[0] }}
                style={{ width: width / 2, height: 110 }}
                resizeMode="cover"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {car2Data.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "black",
              marginVertical: 10,
              marginHorizontal: 10,
              opacity: 0.2,
            }}
          />
          <ScrollView
            style={{ height: height - 360 }}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Price Per Day
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                Rs. {car1Data.price}
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                Rs. {car2Data.price}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Engine Power
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.engine} CC
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.engine} CC
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Fuel Type
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.fuelType}
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.fuelType}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Fuel Tank Capacity
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.fuelCapacity} L
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.fuelCapacity} L
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Fuel Average
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.mileage} kmpl
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.mileage} kmpl
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Transmission Type
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.transmitionType}
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.transmitionType}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Model/Year
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  width: width / 2 - 20,
                }}
              >
                {car1Data.year}
              </Text>
              <View
                style={{
                  width: 1,
                  backgroundColor: "black",
                  marginHorizontal: 10,
                  height: "100%",
                  opacity: 0.2,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  width: width / 2 - 20,
                  marginTop: 5,
                }}
              >
                {car2Data.year}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
                marginHorizontal: 10,
                opacity: 0.2,
              }}
            />
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height - 300,
          }}
        >
          <Text>Select two cars to compare</Text>
        </View>
      )}
    </View>
  );
};

export default CompareCarsScreen;
