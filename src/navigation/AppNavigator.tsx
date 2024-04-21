import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoListScreen from '../components/ToDoListScreen';
import CalendarScreen from '../components/CalendarScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ToDoList" component={ToDoListScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
