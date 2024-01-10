import Start from './components/Start';
import Chat from './components/Chat';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


// Create the navigator
const Stack = createNativeStackNavigator();

// setup app with navigator & start/chat components
const App = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat" >
        {props => <Chat db={db} {...props} />} //pass db object to chat component
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
