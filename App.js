import React from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getShoppingListService} from './src/services/DependencyResolver';
import {translate} from './src/lang/language';

import HomeScreen from './src/views/HomeView';
import ProductsScreen from './src/views/ProductView';
import RecipesScreen from './src/views/RecipesView';

const Tab = createBottomTabNavigator();

// configre icon tabs: https://github.com/GeekyAnts/NativeBase/issues/72#issuecomment-535892409
// generate icon with https://github.com/bamlab/react-native-make

function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={styles.badgeWrapper}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badgePlacement}>
          <Text style={styles.badge}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
}

function ShoppingListWithBadge(props) {
  let currentShoppingList = getShoppingListService().getCurrentShoppingList();
  let badges = 0;
  if (currentShoppingList && currentShoppingList.length > 0) {
    badges = currentShoppingList.length;
  }

  return <IconWithBadge {...props} badgeCount={badges} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.params.name === 'Shopping list') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
                return (
                  <ShoppingListWithBadge
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              }
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          // tabBarOptions={{
          //   activeTintColor: Colors.sky_blue,
          //   inactiveTintColor: 'gray',
          // }}
        >
          <Tab.Screen
            name={translate('MENU_shoppingList')}
            initialParams={{name: 'Shopping list'}}
            component={HomeScreen}
          />
          <Tab.Screen
            name={translate('MENU_products')}
            initialParams={{name: 'Products'}}
            component={ProductsScreen}
          />
          {/* <Tab.Screen name="Recipes" component={RecipesScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  badgeWrapper: {width: 24, height: 24, margin: 5},
  badgePlacement: {
    // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
    position: 'absolute',
    right: -7,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {color: 'white', fontSize: 10, fontWeight: 'bold', marginLeft: 1},
});
