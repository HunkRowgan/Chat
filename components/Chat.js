//chat.js

import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

//set page title to name prop and return view component with text
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name } = route.params
  const { background } = route.params;
  const { userID } = route.params

  const [messages, setMessages] = useState([]); //create messages state

  // send messages
  const onSend = (newMessages) => {addDoc(collection(db, "messages"), newMessages[0])}

//customise UI
  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: '#2a9d8f',
      },
      left: {
        backgroundColor: '#fff'
      }
    }}
    />
  }

    //push messages to storage
    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
      } catch (error) {
        console.log(error.message)
      }
    }
  //get messages from storage
    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem('messages') || []
      setMessages(JSON.parse(cachedMessages))
    }
  
  //hide input field when user offline
    const renderInputToolBar = (props) => {
      if (isConnected) return <InputToolbar {...props} />
      else return null
    }
  
    let unsubMessages

  //fetch messages from database
  useEffect(() => {

    if (isConnected === true) {
      
       // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages()
      unsubMessages = null

      navigation.setOptions({ title: name });
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = []
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
        })
        cacheMessages(newMessages)
        setMessages(newMessages)
      })
    } else loadCachedMessages()

    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [])

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage}{...props} />
  }

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

 return (
  <View style={[styles.container, {backgroundColor: background}]}>
     <Text>Hi {name}! Join the chat!</Text>
     <GiftedChat
      renderInputToolbar={renderInputToolBar}
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      user={{
        _id: userID,
        name: name
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   </View>
 );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;