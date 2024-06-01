import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../Helper/constant";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = () => {
  const { lightTheme } = useSelector((state) => state?.appTheme);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
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
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "40%",
            borderBottomColor: colors?.appColor,
            borderWidth: 1,
          }}
        >
          <Text
            style={[
              styles.timerText,
              {
                color: lightTheme
                  ? colors?.lightModeFont
                  : colors?.darkModeFont,
              },
            ]}
          >
            {formatTime(timer)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.textViewStyle}
            onPress={() => (!isRunning ? handleStart() : handleStop())}
          >
            <Text
              style={{
                color: lightTheme
                  ? colors?.lightModeFont
                  : colors?.darkModeFont,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {!isRunning ? "Start" : "Stop"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textViewStyle} onPress={handleReset}>
            <Text
              style={{
                color: lightTheme
                  ? colors?.lightModeFont
                  : colors?.darkModeFont,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 30,
  },
  textViewStyle: {
    width: 150,
    paddingVertical: 15,
    borderColor: colors?.appColor,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
  },
});
