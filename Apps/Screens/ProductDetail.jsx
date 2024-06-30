import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Button, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail(navigation) {
    const {params}=useRoute();
    const[product,setProduct]=useState([]);
    const {user} =useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    useEffect(()=>{
        params&&setProduct(params.product);
        shareButton();
    },[params, navigation])
    
    const shareButton=()=>{
        nav.setOptions({
            headerRight:()=>(
                <Ionicons name="share-social-sharp" size={24}
                 onPress={()=> shareProduct()}
                 color="white" 
                 style={{marginRight:15}} />
            ),
        })
    }
    /**
     * Used to Share Product
     */
    const shareProduct=async()=>{
        const content={
            message:product.title+"/n"+product.desc,

        }
        Share.share(content).then(resp=>{
            console.log(resp);
        }, (error)=>{
            console.log(error);
        })
    }

    const sendEmailMessage=()=>{
        const subject='Regarding '+product.title;
        const body="Hi "+product.userName+"/n"+"I am interested in this product"
        Linking.openURL('mailto: '+product.userEmail+"?subject= "+subject+"&body= "+body);
    }
    const deleteUserPost=()=>{
      Alert.alert('Delete Post','Are you sure you want to delete this post?',[
        {
        text:'Yes',
        onPress:()=>deletFromFirestore()
      },
      {
        text:'Cancel',
        onPress:()=>console.log('Cancel Pressed'),
        style:'cancel',
      },
      
    ])
      
    }
    const deletFromFirestore=async()=>{
        console.log('Deleted');
        const q=query(collection(db,'UserPost'),where('title','==',product.title))
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
          deleteDoc(doc.ref).then(resp=>{
            console.log("Deleted the Doc...");
            const navRoutes = nav.getState()?.routes;
            if(navRoutes[navRoutes.length - 2]) {
              nav.push(navRoutes[navRoutes.length - 2].name, { reload: true });
            } else {
              nav.goBack();
            }
          })
        })
    }
  return (
    <ScrollView className="bg-white"
    nestedScrollEnabled={true}>
      <Image source={{uri:product.image}}
        className="h-[320px] w-full"
      />

      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
        <Text className="bg-blue-200 p-1 mt-2 px-2 rounded-full text-blue-500">{product.category}</Text>
        </View>
        <Text className="mt-3 font-bold text-[20px]">Description</Text>
        <Text className="text-[14px] text-gray-500">{product?.desc}</Text>
      </View>

    {/* User Info */}
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
            <Image source={{uri:product.userImage}}
                className="w-12 h-12 rounded-full"
            />    
            <View>
                <Text className="font-bold text-[18px]">{product.userName}</Text>
                <Text className="text-gray-500">{product.userEmail}</Text>
            </View>
      </View>

      {user?.primaryEmailAddress.emailAddress==product.userEmail?
      <TouchableOpacity 
      onPress={()=>deleteUserPost()}
      className="z-40 bg-red-500 rounded-full p-4 m-2">
        <Text className="text-center text-white">Delete Post</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity 
      onPress={()=>sendEmailMessage()}
      className="z-40 bg-blue-500 rounded-full p-4 m-2">
        <Text className="text-center text-white">Send Message</Text>
      </TouchableOpacity>  
    }
    </ScrollView>
  )
}