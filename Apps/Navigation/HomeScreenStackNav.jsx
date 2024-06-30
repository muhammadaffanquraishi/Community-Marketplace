import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';
import ExploreScreen from '../Screens/ExploreScreen';

const Stack= createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen}
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='item-list' 
        component={ItemList}
            options={({ route }) => ({ title:route.params.category, 
              headerStyle:{
                backgroundColor:'#3b82f6'
              },
              headerTintColor:'#fff'
            })
            }
        />
        <Stack.Screen name='explore' component={ExploreScreen} 
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='product-detail' 
        component={ProductDetail}
            options={{
              headerStyle:{
              backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff',
            headerTitle:'Detail'
          }}         
        />
    </Stack.Navigator>
  )
}