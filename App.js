import { StyleSheet, Text, View } from "react-native";
import { MainNavigation } from "./src/Navigation/MainNavigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/Reducer";
import { PersistGate } from "redux-persist/es/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
