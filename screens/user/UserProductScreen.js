import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProductScreen;
