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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Toaster, ToasterHelper } from "react-native-customizable-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import ToasterView from "../ToasterView";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const SignupScreen = () => {
  const { colors } = useTheme();
  const userId = useStore((state) => state.userId);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const loading = useStore((state) => state.loading);
  const Navigation = useNavigation();

  const toast = (message, type) => {
    ToasterHelper.show({
      text: message,
      type: type,
      timeout: 5000,
    });
  };

  const onSignup = () => {
    Keyboard.dismiss();
    useStore.setState({ loading: true });
    if (pass !== confirmPass) {
      useStore.setState({ loading: false });
      toast("Passwords do not match", "error");
      return;
    }
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        useStore.setState({ loading: false });
        setDoc(doc(db, "users", auth.currentUser.uid), {
          email: email,
          userId: auth.currentUser.uid,
          isAdmin: false,
        })
          .then(() =>
            getDoc(doc(db, "users", auth.currentUser.uid)).then((doc) => {
              if (doc.exists()) {
                useStore.setState({ loading: false });
                useStore.setState({
                  userId: doc.data().userId,
                  isAdmin: doc.data().isAdmin,
                  email: doc.data().email,
                });
              }
            })
          )
          .catch((error) => {
            useStore.setState({ loading: false });
            toast(error.message, "error");
            console.log(error.message);
          });
      })
      .catch((error) => {
        useStore.setState({ loading: false });
        toast(error.message, "error");
        console.log(error.message);
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
              marginVertical: 50,
            }}
          >
            Signup
          </Text>
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
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              autoComplete={"password"}
              secureTextEntry={true}
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
            />
            <Button
              mode="contained"
              style={styles.buttonSubmit}
              onPress={onSignup}
            >
              {loading ? (
                <ActivityIndicator color={"white"} size={18} />
              ) : (
                "Login"
              )}
            </Button>
            <Text style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Text onPress={() => Navigation.goBack()}>Log In</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
