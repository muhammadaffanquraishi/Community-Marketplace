import { View, Text, FlatList,Image, } from 'react-native'
import React, {useState, useEffect } from 'react'
import { app } from '../../../firebaseConfig'
import { collection, getFirestore,getDocs } from 'firebase/firestore'

export default function Slider() {
  
  const db= getFirestore(app)
  const[sliderList,setSliderList]=useState([]);
  useEffect(()=>{
    getSliders()

  },[sliderList])
  const getSliders=async()=>{
    try{
    // setSliderList([])
    const querySnapshot = await getDocs(collection(db, 'Sliders'));
    const sliders = querySnapshot.docs.map(doc => doc.data());
    setSliderList(sliders);
  } catch (error) {
    console.error('Error fetching slider list', error);
  }
};
console.log('aasfa',sliderList)

  return (
    <View className="mt-5">
      <FlatList
          data={sliderList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index})=>(
            <View>
              <Image source={{uri:item?.Image}}
                 className="h-[200px] w-[330px] mr-3 rounded-lg object-contain"
              />
            </View>
          )}

      />
    </View>
  )
}