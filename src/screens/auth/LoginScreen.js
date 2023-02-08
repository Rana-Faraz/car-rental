import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useStore } from "../../store";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toaster, ToasterHelper } from "react-native-customizable-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import ToasterView from "../ToasterView";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const { colors } = useTheme();
  const userId = useStore((state) => state.userId);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const loading = useStore((state) => state.loading);
  const Navigation = useNavigation();

  const toast = (message, type) => {
    ToasterHelper.show({
      text: message,
      type: type,
      timeout: 5000,
    });
  };

  const onLogin = () => {
    Keyboard.dismiss();
    useStore.setState({ loading: true });
    signInWithEmailAndPassword(auth, email, pass)
      .then(async () => {
        await getDoc(doc(db, "users", auth.currentUser.uid))
          .then((doc) => {
            if (doc.exists()) {
              useStore.setState({ loading: false });
              useStore.setState({
                userId: doc.data().userId,
                isAdmin: doc.data().isAdmin,
                email: doc.data().email,
              });
            }
          })
          .then(() => useStore.setState({ loading: false }));
      })
      .catch((error) => {
        useStore.setState({ loading: false });
        toast(error.message, "error");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text
            variant="titleLarge"
            style={{
              color: colors.text,
              textAlign: "center",
              marginVertical: 100,
            }}
          >
            Login
          </Text>
          <Text>{userId}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              autoComplete={"email"}
              keyboardType={"email-address"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              autoComplete={"password"}
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
            />
            <Button
              mode="contained"
              style={styles.buttonSubmit}
              onPress={onLogin}
            >
              {loading ? (
                <ActivityIndicator color={"white"} size={18} />
              ) : (
                "Login"
              )}
            </Button>
            <Text style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Text onPress={() => Navigation.navigate("Signup")}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    justifyContent: "space-between",
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonSubmit: {
    marginHorizontal: 20,
    marginVertical: 20,
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
