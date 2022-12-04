import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native'
import * as firestore from "../firebase/firestore";

export default function App({ navigation, route }) {
  const [name, setName] = useState("");
  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    (async () => {

    })()
  }, []);

  // submit form
  const submit = async () => {
    if (name == "") {
      Alert.alert('Please Input Name!');
      return;
    }
    if (userCount == "") {
      Alert.alert('Please Input userCount!');
      return;
    }

    let res = await firestore.addTeams({
      name,
      userCount
    });
    Alert.alert('Success!');
    // navigation.replace("Teams");
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={false} //Specifies whether the changes in the status bar should be animated or not. These styles are currently supported: backgroundColor, barStyle and hidden.
        hidden={false}  //Whether to hide the status bar.
        networkActivityIndicatorVisible={false}//Only works for ios. Shows whether the network is in use or not.
        showHideTransition={'fade'}//Only works on ios. The animation effects to use when showing or hiding the status bar ('fade', 'slide').
        backgroundColor='rgba(255,255,255,0)'// {'transparent'} //The background color of the status bar.
        translucent={true}//Specifies whether the status bar is transparent. When set to true, the application will draw under the status bar (so-called "immersive" - partially covered by the status bar). Often used with a status bar with a semi-transparent background color.
        barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
      />
      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

          <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} placeholder='Input Name' value={name} onChangeText={(text) => {
                setName(text);
              }}></TextInput>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>User Count</Text>
              <TextInput style={styles.input} placeholder='Input User Count' value={userCount} onChangeText={(text) => {
                setUserCount(text);
              }}></TextInput>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => {
          submit();
        }}>
          <View style={styles.button}>
            <Text style={{ fontSize: 17, color: "#fff" }}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    width: windowWidth,
    height: windowHeight + 50,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "stretch",
    opacity: 0.6
  },
  headimg: {
    marginTop: 20,
    width: 80,
    height: 80,
    resizeMode: "stretch",
  },
  label: {
    width: 80
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  input: {
    height: 50,
    borderRadius: 5,
    color: "#333",
    width: "100%",
    paddingLeft: 10,

  },
  button: {
    marginTop: 40,
    width: 300,
    backgroundColor: "#546599",
    textAlign: "center",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});