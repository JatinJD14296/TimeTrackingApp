import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, string } from "../Helper/constant";
import { useSelector } from "react-redux";

const AboutUsScreen = () => {
  const { lightTheme, fontSize } = useSelector((state) => state?.appTheme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightTheme ? colors?.lightModeBg : colors?.darkModeBg,
      }}
    >
     
      <ScrollView
        style={{
          width: "90%",
          alignSelf: "center",
          paddingVertical: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: parseInt(fontSize),
            color: lightTheme ? colors?.lightModeFont : colors?.darkModeFont,
          }}
        >
          {string?.aboutUs}
        </Text>
        <View style={{ paddingVertical: 20, width: "100%" }} />
      </ScrollView>
     
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({});
