import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { useDispatch, useSelector } from "react-redux";
import { APP_THEME, FONT_SIZE } from "../Reducer/ThemeReducer";
import { colors } from "../Helper/constant";
import { Dropdown } from "react-native-element-dropdown";
import { baseURL } from "../SecretKey";
import {
  LOGIN_DATA,
  REGISTER_USER,
  REMOVE_RAGISTER_USER,
} from "../Reducer/AuthReducer";
import axios from "axios";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const data = [
    { label: "Fontsize : 12", value: "12" },
    { label: "Fontsize : 14", value: "14" },
    { label: "Fontsize : 16", value: "16" },
    { label: "Fontsize : 18", value: "18" },
    { label: "Fontsize : 20", value: "20" },
    { label: "Fontsize : 22", value: "22" },
    { label: "Fontsize : 24", value: "24" },
    { label: "Fontsize : 26", value: "26" },
  ];
  const [value, setValue] = useState(null);
  const { lightTheme } = useSelector((state) => state?.appTheme);
  const { loginUser, registerUser } = useSelector((state) => state?.auth);
  const [lightMode, setLightMode] = useState(lightTheme);

  const deleteHandler = async () => {
    await axios
      .delete(baseURL +`"user/${loginUser[0]?.id}`)
      .then(async (response) => {
        if (response?.data?.code == 200) {
          dispatch({ type: LOGIN_DATA, payload: [] });
          dispatch({ type: REMOVE_RAGISTER_USER, payload: loginUser[0] });
          navigation.replace("AuthStack");
        } else {
          Alert.alert("Error", response?.error);
        }
      })
      .catch((error) => console.log("error---", error));
  };
  const logoutHandler = async () => {
    dispatch({ type: LOGIN_DATA, payload: [] });
    navigation.replace("AuthStack");
  };

  const renderItem = (item) => {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: lightMode
              ? colors?.lightModeBg
              : colors?.darkModeBg,
          },
        ]}
      >
        <Text
          style={[
            styles.textItem,
            { color: lightMode ? colors?.lightModeFont : colors?.darkModeFont },
          ]}
        >
          {item.label}
        </Text>
        {item.value === value && <View style={styles.selectedView} />}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightTheme ? colors?.lightModeBg : colors?.darkModeBg,
      }}
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        <View
          style={[
            styles.themeBtnView,
            {
              backgroundColor: lightTheme
                ? colors?.lightModeBg
                : colors?.darkModeBg,
            },
          ]}
        >
          <Text
            style={{
              color: lightTheme ? colors?.lightModeFont : colors?.darkModeFont,
            }}
          >
            Dark Theme
          </Text>
          <ToggleSwitch
            isOn={!lightMode}
            onColor={colors?.appColor}
            offColor="grey"
            size="medium"
            onToggle={ async (value) => {
              setLightMode(!value);
              await axios
              .put(baseURL +`user/${loginUser[0]?.userName}`, {
                theme: value,
                update: 'Theme',
              })
              .then((res) => {
                if (res?.status === 200) {
                  dispatch({ type: APP_THEME, payload: !value });
                } else {
                  Alert.alert("Error", response?.data?.error || "Login failed");
                }
              })
              .catch((err) => {
                Alert.alert("Error", err.message || "Login failed");
              });
            }}
            thumbOnStyle={{ backgroundColor: "#fff" }}
          />
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={[
            styles.placeholderStyle,
            { color: lightMode ? colors?.lightModeFont : colors?.darkModeFont },
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            { color: lightMode ? colors?.lightModeFont : colors?.darkModeFont },
          ]}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Font Size"
          searchPlaceholder="Search..."
          value={value}
          onChange={async (item) => {
            setValue(item.value);
            await axios
              .put(baseURL +`user/${loginUser[0]?.userName}`, {
                fontSize: item?.value,
                update: 'FontSize',
              })
              .then((res) => {
                if (res?.status === 200) {
                  dispatch({ type: FONT_SIZE, payload: item?.value });
                } else {
                  Alert.alert("Error", response?.data?.error || "Login failed");
                }
              })
              .catch((err) => {
                Alert.alert("Error", err.message || "Login failed");
              });
          }}
          renderItem={renderItem}
        />
        <TouchableOpacity
          style={[
            styles.themeBtnView,
            {
              backgroundColor: lightTheme
                ? colors?.lightModeBg
                : colors?.darkModeBg,
              paddingVertical: 18,
            },
          ]}
          onPress={logoutHandler}
        >
          <Text
            style={[
              styles.textItem,
              {
                color: lightMode ? colors?.lightModeFont : colors?.darkModeFont,
              },
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.themeBtnView,
            {
              backgroundColor: lightTheme
                ? colors?.lightModeBg
                : colors?.darkModeBg,
              paddingVertical: 18,
            },
          ]}
          onPress={deleteHandler}
        >
          <Text
            style={[
              styles.textItem,
              {
                color: lightMode ? colors?.lightModeFont : colors?.darkModeFont,
              },
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  themeBtnView: {
    width: "100%",
    borderColor: colors?.appColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  dropdown: {
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 12,
    borderColor: colors?.appColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedView: {
    width: 10,
    height: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
});
