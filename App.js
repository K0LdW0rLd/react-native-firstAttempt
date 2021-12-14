import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './app/views/Home';
import Contact from './app/views/Contact';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Video from './app/views/Video';
import VideoDetail from './app/views/VideoDetail';
import Register from './app/views/Register';
import Login from './app/views/Login';
import Quiz from './app/views/Quiz';
import Finish from './app/views/QuizFinish';
import Blog from './app/views/Blog';
import BlogDetail from './app/views/BlogDetail';
import About from './app/views/About';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Finish" component={Finish} />
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="BlogDetail" component={BlogDetail} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
