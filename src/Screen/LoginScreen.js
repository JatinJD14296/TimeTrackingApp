import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { colors, string } from "../Helper/constant";
import TextInputComponent from "../Component/TextInputComponent";
import ButtonComponent from "../Component/ButtonComponent";
import HeaderTitle from "../Component/HeaderTitle";
import axios from "axios";
import { LOGIN_DATA } from "../Reducer/AuthReducer";
import { baseURL } from "../SecretKey";

const LoginScreen = ({ navigation }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { lightTheme } = useSelector((state) => state?.appTheme);
  const { registerUser } = useSelector((state) => state?.auth);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userName.trim());
  };

  const loginOnPress = async () => {
    const emailVerify = validateEmail();
    if (userName.trim() === "" || password.trim() === "") {
      Alert.alert("Validation Error", "Username and password are required");
      return;
    } else if (!emailVerify) {
      Alert.alert("Validation Error", "Please enter valid email");
    } else {
      const user = registerUser?.find(
        (user) =>
          user.userName === userName.trim() && user.password === password.trim()
      );
      if (user) {
        await fetch(baseURL + "login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: userName.trim(),
            password: password.trim(),
          })
        })
        .then((res) => {
            if (res?.status === 200) {
              dispatch({
                type: LOGIN_DATA,
                payload: [
                  {
                    userName: userName.trim(),
                    password: password.trim(),
                    // id: user?.id,
                  },
                ],
              });
              navigate("HomeDrawer");
            } else {
              Alert.alert("Error", res?.data?.error || "Login failed");
            }
          })
          .catch((err) => Alert.alert("Error", err.message || "Login failed"));
      }
      else{
        Alert.alert("Error", "Something went wrong...!");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightTheme ? colors?.lightModeBg : colors?.darkModeBg,
      }}
    >
      <SafeAreaView
        style={{
          backgroundColor: lightTheme
            ? colors?.lightModeBg
            : colors?.darkModeBg,
        }}
      />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <HeaderTitle title={string?.loginIn} subTitle={string?.logInSubTitle} />
        <TextInputComponent
          value={userName.trim()}
          placeholder={"Username"}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInputComponent
          value={password.trim()}
          placeholder={"Password"}
          onChangeText={(text) => setPassword(text)}
        />
        <ButtonComponent onPressBtn={loginOnPress} title={"Log In"} />

        <View style={{ marginTop: 40, flexDirection: "row" }}>
          <Text
            style={[
              styles.noActText,
              {
                color: lightTheme
                  ? colors?.lightModeFont
                  : colors?.darkModeFont,
              },
            ]}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigate("SignUpScreen")}>
            <Text style={styles.signUpText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  signUpText: {
    fontSize: 15,
    fontWeight: "800",
    textDecorationLine: "underline",
    color: colors?.appColor,
  },
  noActText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
