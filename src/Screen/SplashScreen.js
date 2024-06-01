import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../Helper/constant";
import { useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const { navigate } = useNavigation();
  const { lightTheme } = useSelector((state) => state?.appTheme);
  const { loginUser } = useSelector((state) => state?.auth);
  
  useEffect(() => {
    setTimeout(() => {
      if (loginUser.length > 0) {
        navigation?.replace("HomeDrawer");
      } else {
        navigate("AuthStack");
      }
    }, 3000);
  }, []);

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: lightTheme
            ? colors?.lightModeBg
            : colors?.darkModeBg,
        },
      ]}
    >
      <Text style={[styles.titleStyle, { color: colors?.appColor }]}>
        Time Tracking
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  titleStyle: {
    paddingVertical: 20,
    width: "95%",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "700",
  },
});
