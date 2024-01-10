//chat.js

import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";

//set page title to name prop and return view component with text
const Chat = ({ route, navigation, db }) => {
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

  //fetch messages from database
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = []
      documentsSnapshot.forEach(doc => {
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
      })
      setMessages(newMessages)
    })

    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [])


 return (
  <View style={[styles.container, {backgroundColor: background}]}>
     <Text>Hi {name}! Join the chat!</Text>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
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