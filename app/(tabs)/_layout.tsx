import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';

export default function TabLayout() {
  const pathname = usePathname();
     
  // Hide tab bar on nested screens
  const isMainTabScreen = ['/home', '/earnings', '/account'].includes(pathname);
 
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 108,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          paddingBottom: 20,
          paddingTop: 16,
          elevation: 8,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          display: isMainTabScreen ? 'flex' : 'none',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#8D14CE',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: 'General-Sans-Medium',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingTop: 0,
          width: '33.33%', // Ensure each tab takes exactly one-third of the space
        },
      }}
      initialRouteName="home/index"
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "cube" : "cube-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      /> */}
     
    </Tabs>
  );
}