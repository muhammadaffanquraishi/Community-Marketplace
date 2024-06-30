import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { app } from "../../firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <ScrollView className="p-2">
      {loading ? (
        <ActivityIndicator className="mt-20" size={"large"} color={"#3b82f6"} />
      ) : itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} />
      ) : (
        <Text className="p-5 text-[20px] mt-20 justify-center text-center text-gray-500">
          No Posts Available
        </Text>
      )}
    </ScrollView>
  );
}
