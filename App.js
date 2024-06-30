import { Image, TouchableOpacity, StyleSheet, Platform, View, Text, TextInput, Button, Alert} from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import TabNavigation from './Apps/Navigation/TabNavigation';

export default function App() {
  const Stack = createNativeStackNavigator()
  
  return (
     <ClerkProvider publishableKey='pk_test_c29saWQtamF2ZWxpbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk'>
     <View className="flex-1 bg-white">
       <SignedIn>
            <NavigationContainer>
             <TabNavigation/>
           </NavigationContainer>
         </SignedIn>
         <SignedOut>
           <LoginScreen/>
         </SignedOut>
     </View>
     </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
