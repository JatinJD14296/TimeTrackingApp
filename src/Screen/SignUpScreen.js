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
import { REGISTER_USER } from "../Reducer/AuthReducer";
import { baseURL } from "../SecretKey";

const SignUpScreen = ({ navigation }) => {
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { lightTheme } = useSelector((state) => state?.appTheme);
  const generateRandomNumber = () => {
    // Generate a random number between 100 and 999
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return randomNumber;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userName.trim());
  };

  const signUpOnPress = async () => {
    const emailVerify = validateEmail();
    if (
      userName.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Alert.alert("Validation Error", "Please enter all values");
    } else if (password.trim() !== confirmPassword.trim()) {
      Alert.alert(
        "Validation Error",
        "Password and confirm password are not match"
      );
    } else if (!emailVerify) {
      Alert.alert("Validation Error", "Please enter valid email");
    } else {
      const randomNumber = generateRandomNumber();

      await fetch(baseURL + "register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim(),
          password: password.trim(),
          id: randomNumber,
        }),
      })
        .then(async (response) => {
          let data = await response.json();
          if (data?.code == 200) {
            dispatch({
              type: REGISTER_USER,
              payload: {
                userName: userName.trim(),
                password: password.trim(),
                id: randomNumber,
              },
            });
            goBack();
          } else {
            Alert.alert("Error", data?.error);
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "SignUp failed");
        });
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
        <HeaderTitle title={string.signUp} subTitle={string?.signUpSubTitle} />
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
        <TextInputComponent
          value={confirmPassword.trim()}
          placeholder={"Confirm Password"}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <ButtonComponent onPressBtn={signUpOnPress} title={"Sign Up"} />
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  titleStyle: {
    alignItems: "center",
    fontSize: 30,
    fontWeight: "700",
  },
  mainTitleView: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    width: "85%",
  },
 
  textInputStyle: {
    width: "90%",
    paddingVertical: 20,
    borderColor: colors?.appColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  btnView: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: colors?.appColor,
    marginVertical: 8,
    borderRadius: 10,
    width: "90%",
  },
  loginBtn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
