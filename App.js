//app.js

import Start from './components/Start';
import Chat from './components/Chat';
import { useState, useEffect } from "react";
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useNetInfo } from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { getStorage } from "firebase/storage";

  // Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo() // connection status state

   //display an alert popup if connection lost
   useEffect(() => {
    if (connectionStatus.isConnected === false){
      Alert.alert("Disconnected")
      disableNetwork(db)
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db)
    }
  }, [connectionStatus.isConnected]) // updates when connection status changes

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
    const storage = getStorage(app);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" >
            {props => <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />}  
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
