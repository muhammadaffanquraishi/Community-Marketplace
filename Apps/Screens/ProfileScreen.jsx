import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import diary from "./../../assets/Images/diary.jpg";
import logout from "./../../assets/Images/logout.jpg";
import search from "./../../assets/Images/search.jpg";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isolated, signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "My Products",
      icon: diary,
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: search,
      path: "explore",
    },
    {
      id: 4,
      name: "ABCDE",
      icon: search,
    },
    {
      id: 3,
      name: "Logout",
      icon: logout,
      url: "",
    },
  ];

  const onMenuPress = (item) => {
    if (item.name == "Logout") {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };

  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center mt-15">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="font-bold text[25px] m-2">{user?.fullName}</Text>
        <Text className="text[18px] m-2 text-gray-400">
          {user?.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={menuList}
        numColumns={3}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className="flex-1 p-3 border-[1px] items-center mx-2 mt-4 rounded-lg border-blue-400
             bg-blue-50"
          >
            {item.icon && (
              <Image source={item?.icon} className="w-[50px] h-[50px]" />
            )}
            <Text className="text-[12px] mt-2 text-blue-700">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
