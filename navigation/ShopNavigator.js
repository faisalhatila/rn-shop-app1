import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator,DrawerNavigatorItems } from "react-navigation-drawer";
import ProductsOverViewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import { Platform,SafeAreaView,Button,View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch} from 'react-redux'
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from '../screens/StartupScreen'
import * as authActions from '../store/actions/auth'
import auth from "../store/reducers/auth";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "#fff" : "",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
    contentComponent: props => {
      const dispatch = useDispatch()
      return <View style={{flex:1,padding:20}}>
        <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
          <DrawerNavigatorItems {...props} />
          <Button title="Logout" color={Colors.primaryColor} onPress={() => {
            dispatch(authActions.logout())
            // props.navigation.navigate('Auth')
            }}/>
        </SafeAreaView>
      </View>
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
},{
  defaultNavigationOptions:defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup:StartupScreen,
  Auth:AuthNavigator,
  Shop:ShopNavigator,
})

export default createAppContainer(MainNavigator);
