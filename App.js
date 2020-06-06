import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/views/HomeView';
import ProductsScreen from './src/views/ProductView';
import RecipesScreen from './src/views/RecipesView';
import Colors from './src/shared/Colors';

const Tab = createBottomTabNavigator();

// configre icon tabs: https://github.com/GeekyAnts/NativeBase/issues/72#issuecomment-535892409

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Products') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Current list') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: Colors.sky_blue,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Current list" component={HomeScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          {/* <Tab.Screen name="Recipes" component={RecipesScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
