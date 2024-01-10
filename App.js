//app.js

import Start from './components/Start';
import Chat from './components/Chat';
import { useState } from "react";
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDGCEYJXRdgRkkigamr5qOmeZ3EQIri68s",
    authDomain: "chat-5c6ae.firebaseapp.com",
    projectId: "chat-5c6ae",
    storageBucket: "chat-5c6ae.appspot.com",
    messagingSenderId: "217624901036",
    appId: "1:217624901036:web:b6f4d79c45c5941f7ef609"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" >
          {props => <Chat db={db} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  });
  
  export default App;
