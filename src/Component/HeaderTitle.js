import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Helper/constant";
import { useSelector } from "react-redux";

const HeaderTitle = (props) => {
    const {title,subTitle}=props
    const { lightTheme } = useSelector((state) => state?.appTheme);

  return (
    <View style={styles.mainTitleView}>
      <Text
        style={[
          styles.titleStyle,
          { color: lightTheme ? colors?.appColor : colors?.appColor },
        ]}
      >
       {title}
      </Text>
      <Text
        style={[
          styles.welcomeText,
          {
            color: lightTheme ? colors?.lightModeFont : colors?.darkModeFont,
          },
        ]}
      >
       {subTitle}
      </Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  mainTitleView: {
    position: "absolute",
    top: 50,
    alignItems: "center",
    width: "85%",
  },
  welcomeText: {
    marginTop: 26,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  titleStyle: {
    alignItems: "center",
    fontSize: 30,
    fontWeight: "700",
  },
});
