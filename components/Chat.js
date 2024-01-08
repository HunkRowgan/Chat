import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//set page title to name prop and return view component with text
const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const {background} = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
  <View style={[styles.container, {backgroundColor: background}]}>
     <Text>Hello {name}</Text>
   </View>
 );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;