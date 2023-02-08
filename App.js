import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useStore } from "./src/store";
import { Toaster } from "react-native-customizable-toast";
import { AdminNavigation, AppNavigation, AuthNavigation } from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToasterView from "./src/screens/ToasterView";
import { useEffect, useState } from "react";

export default function App() {
  const [userId, setUserId] = useState(useStore((state) => state.userId));
  const [admin, setAdmin] = useState(useStore((state) => state.adminView));
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.userId,
      (userId) => setUserId(userId)
    );
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.isAdmin,
      (isAdmin) => setAdmin(isAdmin)
    );
    return () => unsubscribe();
  }, []);
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          {userId ? (
            admin ? (
              <AdminNavigation />
            ) : (
              <AppNavigation />
            )
          ) : (
            <AuthNavigation />
          )}
          {/* <AdminNavigation /> */}
        </NavigationContainer>
        <ToasterView />
        <StatusBar style="dark" />
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
