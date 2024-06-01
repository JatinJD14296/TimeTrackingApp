import { combineReducers, legacy_createStore as createStore } from "redux";
import ThemeReducer from "./ThemeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistReducer, persistStore } from "redux-persist";
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
  appTheme: ThemeReducer,
  auth: AuthReducer,
});

const persistConfige = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfige, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
