import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getDocsFromServer, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'

export default function ExploreScreen() {
  const db=getFirestore(app)
  const[productList,setproductList]=useState([]);

  useEffect(()=>{
    getAllProducts();
  },[])
  /**
   * Used to get all Products
   */
  const getAllProducts=async()=>{
    try{
    setproductList([]);
    const q=query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'))
    // console.log(q)
    const snapshot=await getDocs(q);
    // console.log(snapshot.size)
    snapshot.forEach((doc)=>{
      console.log(doc.data)
      setproductList(productList=>[...productList,doc.data()]);
    })}

    catch(error) {
      console.error("Error fetching Products",error);
    }
    
  }
  return (
    <ScrollView className="p-5 py-8"
    nestedScrollEnabled={true}>
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  )
}