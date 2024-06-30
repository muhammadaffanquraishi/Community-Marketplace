import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import PostItem from "./PostItem";
import { useNavigation } from "@react-navigation/native";

export default function LatestItemList({ latestItemList, heading }) {
  const navigation = useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
        scrollEnabled={false}
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
              onPress={() =>
                navigation.push("product-detail", {
                  product: item,
                })
              }
            >
              <Image
                source={{ uri: item.image }}
                className="w-full h-[140px] rounded-lg"
              />
              <View>
                <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
                <Text className="text-[20px] font-bold text-blue-500">
                  $ {item.price}
                </Text>
                <Text className="text-blue-500 bg-blue-50 mt-1 p-1 text-center rounded-full px-1 text-[10px] w-[70px]">
                  {item.category}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
