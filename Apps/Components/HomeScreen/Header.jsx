import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState(null);
  const nav = useNavigation();

  const getSearchedItems = (searchQuery) => {
    nav.push("explore", { searchQuery: searchQuery });
  };
  return (
    <View>
      {/* User Info Section */}
      <View className="flex flex-row items-center gap-4">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[16px]">Welcome!</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>

      {/* Search Bar Section */}

      <View
        className="p-[9px] px-5 flex flex-row items-center gap-3
       bg-blue-50 mt-5 rounded-full border-[1px] border-blue-200"
      >
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          className="ml-2 text-[18px] flex-auto"
          onChangeText={(value) => setSearchText(value)}
        />

        <TouchableOpacity
          className="rounded-full bg-blue-500 p-2"
          onPress={(e) => getSearchedItems(searchText)}
        >
          <Text className="text-white">Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
