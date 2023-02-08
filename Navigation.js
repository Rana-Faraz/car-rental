import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import AddCarImageScreen from "./src/screens/admin/AddCarImageScreen";
import AddCarPrice from "./src/screens/admin/AddCarPrice";
import AddCarScreen from "./src/screens/admin/AddCarScreen";
import AdminHome from "./src/screens/admin/AdminHome";
import AllCarsScreen from "./src/screens/admin/AllCarsScreen";
import ApprovedBookingScreen from "./src/screens/admin/ApprovedBookingScreen";
import AvailableCarsScreen from "./src/screens/admin/AvailableCarsScreen";
import BookinDetailScreen from "./src/screens/admin/BookinDetailScreen";
import CarsDetailsScreen from "./src/screens/admin/CarsDetailsScreen";
import ConfirmBookingsScreen from "./src/screens/admin/ConfirmBookingsScreen";
import RejectedBookingScreen from "./src/screens/admin/RejectedBookingScreen";
import BookingDoneScreen from "./src/screens/app/BookingDoneScreen";
import BookingScreen from "./src/screens/app/BookingScreen";
import CarListScreen from "./src/screens/app/CarListScreen";
import HistoryScreen from "./src/screens/app/HistoryScreen";
import PaymentPage from "./src/screens/app/PaymentPage";
import PaymentTypeScreen from "./src/screens/app/PaymentTypeScreen";
import ProfileScreen from "./src/screens/app/ProfileScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import TopNavigator from "./TopNavigation";

const AuthNavigation = () => {
  const Stack = createStackNavigator();
  const headerOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Stack = createStackNavigator();
  const headerOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Homescreen" component={TopNavigator} />
      <Stack.Screen name="Carlist" component={CarListScreen} />
      <Stack.Screen name="Book" component={BookingScreen} />
      <Stack.Screen name="Payment Type" component={PaymentTypeScreen} />
      <Stack.Screen name="Payment" component={PaymentPage} />
      <Stack.Screen name="Booking Done" component={BookingDoneScreen} />
      <Stack.Screen
        name="ProfileScreen"
        options={{
          presentation: "modal",
          ...TransitionPresets.ModalPresentationIOS,
          guestureEnabled: true,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="HistoryScreen"
        options={{
          presentation: "modal",
          ...TransitionPresets.ModalPresentationIOS,
          guestureEnabled: true,
        }}
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
};

const AdminNavigation = () => {
  const Stack = createStackNavigator();
  const headerOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Homescreen" component={AdminHome} />
      <Stack.Screen name="AddCars" component={AddCarScreen} />
      <Stack.Screen name="CarImage" component={AddCarImageScreen} />
      <Stack.Screen name="CarPrice" component={AddCarPrice} />
      <Stack.Screen name="AvailableCars" component={AvailableCarsScreen} />
      <Stack.Screen name="Carlist" component={CarsDetailsScreen} />
      <Stack.Screen name="ConfirmBookings" component={ConfirmBookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookinDetailScreen} />
      <Stack.Screen name="ApprovedBooking" component={ApprovedBookingScreen} />
      <Stack.Screen name="RejectedBooking" component={RejectedBookingScreen} />
      <Stack.Screen name="AllCars" component={AllCarsScreen} />
    </Stack.Navigator>
  );
};
export { AppNavigation, AuthNavigation, AdminNavigation };
