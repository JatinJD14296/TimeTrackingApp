import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../Helper/constant";

const TextInputComponent = (props) => {
  const { value, placeholder, onChangeText } = props;
  const { lightTheme } = useSelector((state) => state?.appTheme);

  return (
    <View style={styles.textInputView}>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        style={[
          styles.textInputStyle,
          {
            backgroundColor: lightTheme
              ? colors?.lightModeBg
              : colors?.darkModeBg,
            color: lightTheme ? colors?.lightModeFont : colors?.darkModeFont,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors?.grey}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textInputView: { width: "100%", alignItems: "center" },
  textInputStyle: {
    width: "90%",
    paddingVertical: 20,
    borderColor: colors?.appColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
