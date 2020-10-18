import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Order from "../../models/order";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>No orders found, may be ordering some products some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrdersScreen;
