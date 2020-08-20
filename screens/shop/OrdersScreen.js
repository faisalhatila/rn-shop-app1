import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Order from "../../models/order";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

const styles = StyleSheet.create({});
OrdersScreen.navigationOptions = {
  headerTitle = "Your Orders"
}
export default OrdersScreen;
