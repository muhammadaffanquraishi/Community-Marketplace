import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./../Components/HomeScreen/Header";
import Slider from "./../Components/HomeScreen/Slider";
import { getDoc, getFirestore, orderBy } from "firebase/firestore";
import { app } from "./../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Categories from "./../Components/HomeScreen/Categories";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const db = getFirestore(app);

  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getLatestItemList();
  }, []);
  // console.log("affan",categoryList,sliderList,latestItemList)
  /**
   * used to get silder for home screen
   */
  //   const getSliders=async()=>{
  //     try{
  //     // setSliderList([])
  //     const querySnapshot = await getDocs(collection(db, 'Sliders'));
  //     const sliders = querySnapshot.docs.map(doc => doc.data());
  //     setSliderList(sliders);
  //   } catch (error) {
  //     console.error('Error fetching slider list', error);
  //   }
  // };

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = querySnapshot.docs.map((doc) => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const getLatestItemList = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "UserPost"),
        orderBy("createdAt", "desc")
      );
      const latestItems = querySnapshot.docs.map((doc) => doc.data());
      setLatestItemList(latestItems);
    } catch (error) {
      console.error("Error fetching latest items", error);
    }
  };
  return (
    <ScrollView
      className="py-8 px-6 bg-white flex-1"
      nestedScrollEnabled={true}
    >
      <Header />

      {/* Slider Component */}
      <Slider />

      {/* Category List */}
      <Categories categoryList={categoryList} />
      {/* Latest Item List */}
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Latest Items"}
      />
    </ScrollView>
  );
}
