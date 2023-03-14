import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
        console.log(contact[0]);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listcontainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          <View>
            <Text>
              {item.name} {item.phoneNumbers !== undefined && item.phoneNumbers[0].number}
            </Text>
          </View>}
        data={contact}
      />
      <Button title="Get Contact" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    marginTop: 50,
    marginBottom: 20,
 },
});
