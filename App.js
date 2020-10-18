import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
// import ShopNavigator from "./navigation/ShopNavigator";
import NavigationContainer from "./navigation/NavigationContainer";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
enableScreens();
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth:authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
