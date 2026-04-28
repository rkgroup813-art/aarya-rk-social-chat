import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase/app';
import 'firebase/auth';

// Screens ko import kar rahe hain
import LoginScreen from './src/screens/Auth/LoginScreen';
import ChatScreen from './src/screens/Chat/ChatScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen'; 

const Stack = createNativeStackNavigator();

// Firebase configuration (Apni sahi keys yahan check kar lena)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "aarya-rk-social-chat.firebaseapp.com",
  projectId: "aarya-rk-social-chat",
  storageBucket: "aarya-rk-social-chat.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Profile" : "Login"}>
        {user ? (
          // Jab user login ho, toh ye screens dikhengi
          <>
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'V.I.P. RAJAJI Profile', headerStyle: { backgroundColor: '#1e272e' }, headerTintColor: '#fff' }} 
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          // Jab user login na ho
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
