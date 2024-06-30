import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDocsFromServer,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setproductList] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const route = useRoute();

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchText(route.params?.searchQuery);
      getAllProducts(route.params?.searchQuery);
    } else {
      setSearchText(null);
    }
  }, [route.params?.searchQuery]);
  /**
   * Used to get all Products
   */

  const getAllProducts = async (searchTerm) => {
    try {
      setproductList([]);
      const q = searchTerm
        ? query(
            collection(db, "UserPost"),
            where("title", "==", searchTerm),
            orderBy("createdAt", "desc")
          )
        : query(collection(db, "UserPost"), orderBy("createdAt", "desc"));

      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setproductList(products);
    } catch (error) {
      console.error("Error fetching Products", error);
    }
  };
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View
        className="p-[10px] px-5 flex flex-row items-center gap-3
       bg-blue-50 mt-10 rounded-full border-[1px] border-blue-200"
      >
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          defaultValue={searchText}
          className="ml-2 text-[18px] flex-auto"
          onChangeText={(value) => setSearchText(value)}
        />

        <TouchableOpacity
          className="rounded-full bg-blue-500 p-2"
          onPress={(e) => getAllProducts(searchText)}
        >
          <Text className="text-white">Go</Text>
        </TouchableOpacity>
      </View>
      <View className="p-5 py-8" >
        <Text className="text-[30px] font-bold">
          {searchText ? "Search Results" : "Explore More"}
        </Text>
        <LatestItemList latestItemList={productList} />
      </View>
    </ScrollView>
  );
}
