import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../Helper/constant";

const ButtonComponent = (props) => {
  const { onPressBtn, title } = props;
  return (
    <View style={styles.btnView1}>
      <TouchableOpacity style={styles.btnView} onPress={onPressBtn}>
        <Text style={styles.loginBtn}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  btnView1: { width: "100%", alignItems: "center" },
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
