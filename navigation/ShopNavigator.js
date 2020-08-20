import { createStackNavigator, createAp } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProductsOverViewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
const Productsnavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : "",
    },
  }
);

export default createAppContainer(Productsnavigator);
