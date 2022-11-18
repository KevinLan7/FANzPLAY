import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalColors } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import Questions from './screens/Questions';
import AddQuestions from './screens/AddQuestions';

import Games from './screens/Games';
import Teams from './screens/Teams';
import AddGame from './screens/AddGame';
import AddTeam from './screens/AddTeam';

import React from 'react';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Overview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalColors.colors.slateblue },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalColors.colors.slateblue },
        tabBarActiveTintColor: GlobalColors.colors.gold,
        // headerRight: ({ tintColor }) => (
        //   <IconButton
        //     icon="add"
        //     size={24}
        //     color={tintColor}
        //     onPress={() => {
        //       navigation.navigate('AddExpense');
        //     }}
        //   />
        // )
      })}
    >
      <BottomTabs.Screen
        name="Questions"
        component={Questions}
        options={{
          title: 'Questions',
          tabBarLabel: 'Questions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          )
        }}
      />

      <BottomTabs.Screen
        name="Games"
        component={Games}
        options={{
          title: 'Games',
          tabBarLabel: 'Games',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Teams"
        component={Teams}
        options={{
          title: 'Teams',
          tabBarLabel: 'Teams',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalColors.colors.slateblue },
            headerTintColor: 'white'
          }}
        >
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddGame"
            component={AddGame}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AddTeam"
            component={AddTeam}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AddQuestions"
            component={AddQuestions}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
