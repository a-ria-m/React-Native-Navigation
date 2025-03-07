import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import CartScreen from '../screens/Cart';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
        />
        <Stack.Screen 
          name="Checkout" 
          component={Checkout} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;