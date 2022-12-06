import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, Modal, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native'
import * as firestore from "../firebase/firestore";
import { queryQuestions } from '../firebase/firestore';
import { async } from '@firebase/util';

export default function AddQuestions({ navigation, route }) {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [question, setQuestion] = useState("");
  const [correctanswer, setCorrectanswer] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    (async () => {

    })()
  }, []);

  // submit form 
  const submit = async () => {
    // if Question is empty show error msg
    if (question == "") {
      Alert.alert('Please Input Question!');
      return;
    }
    // if Answer1 is empty show error msg
    if (answer1 == "") {
      Alert.alert('Please Input Answer1!');
      return;
    }
    // if Answer2 is empty show error msg
    if (answer2 == "") {
      Alert.alert('Please Input Answer2!');
      return;
    }
    // if Answer3 is empty show error msg
    if (!answer3) {
      Alert.alert('Please Select Answer3!');
      return;
    }
    // if Answer4 is empty show error msg
    if (!answer4) {
      Alert.alert('Please Select Answer4!');
      return;
    }
    // if Question is empty show error msg
    if (!question) {
      Alert.alert('Please Select Question!');
      return;
    }
    // if Correctanswer is empty show error msg
    if (!correctanswer) {
      Alert.alert('Please Select Correctanswer!');
      return;
    }
    // if Duration is empty show error msg
    if (!duration) {
      Alert.alert('Please Select Duration!');
      return;
    }

    let res = await firestore.addQuestions({
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctanswer,
      duration
    });
    Alert.alert('Success!');
    // navigation.push("Questions");
  }

  const add = async (item) => {
    questions.push(item);
    setQuestions([...questions]);
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
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled>

          <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

            <View style={{ backgroundColor: "#fff" }}>
              <View style={styles.row}>
                <Text style={styles.label}>Question</Text>
                <TextInput style={styles.input} placeholder='Input Question' value={question} onChangeText={(text) => {
                  setQuestion(text);
                }}></TextInput>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Answer1</Text>
                <TextInput style={styles.input} placeholder='Input Answer1' value={answer1} onChangeText={(text) => {
                  setAnswer1(text);
                }}></TextInput>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Answer2</Text>
                <TextInput style={styles.input} placeholder='Input Answer2' value={answer2} onChangeText={(text) => {
                  setAnswer2(text);
                }}></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Answer3</Text>
                <TextInput style={styles.input} placeholder='Input Answer3' value={answer3} onChangeText={(text) => {
                  setAnswer3(text);
                }}></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Answer4</Text>
                <TextInput style={styles.input} placeholder='Input Answer4' value={answer4} onChangeText={(text) => {
                  setAnswer4(text);
                }}></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Correctanswer</Text>
                <TextInput style={styles.input} placeholder='Input Correctanswer' value={correctanswer} onChangeText={(text) => {
                  setCorrectanswer(text);
                }}></TextInput>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Duration</Text>
                <TextInput style={styles.input} placeholder='Input Duration' value={duration} onChangeText={(text) => {
                  setDuration(text);
                }}></TextInput>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => {
          submit();
        }}>
          <View style={styles.button}>
            <Text style={{ fontSize: 17, color: "#fff" }}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View >
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
    width: 100
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
  addbutton: {
    marginTop: 40,
    width: 100,
    backgroundColor: "#5465ff",
    textAlign: "center",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 40,
    width: 300,
    backgroundColor: "#546599",
    textAlign: "center",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  }
});