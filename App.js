import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './src/views/HomeView';
import ProductsScreen from './src/views/ProductView';
import RecipesScreen from './src/views/RecipesView';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator>
          {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
          <Tab.Screen name="Products" component={ProductsScreen} />
          {/* <Tab.Screen name="Recipes" component={RecipesScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
