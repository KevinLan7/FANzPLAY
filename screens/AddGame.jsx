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

export default function App({ navigation, route }) {
  const [AwayTeam, setAwayTeam] = useState("");
  const [HomeTeam, setHomeTeam] = useState("");
  const [JoinCode, setJoinCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([]);

  // load all questions
  const load = async () => {
    let res = await queryQuestions();
    console.log("res", res);

    let list = res.docs.map((snapDoc) => {
      let data = snapDoc.data();
      data = { ...data, id: snapDoc.id };
      return data;
    });
    console.log("list", list);
    setList(list);
  }



  useEffect(() => {
    (async () => {
      load();
    })()
  }, []);

  // submit a game
  const submit = async () => {
    // if AwayTeam is empty show error msg
    if (AwayTeam == "") {
      Alert.alert('Please Input AwayTeam!');
      return;
    }

    // if HomeTeam is empty show error msg
    if (HomeTeam == "") {
      Alert.alert('Please Input HomeTeam!');
      return;
    }
    // if JoinCode is empty show error msg
    if (JoinCode == "") {
      Alert.alert('Please Input JoinCode!');
      return;
    }
    // if Questions is empty show error msg
    if (!questions.length) {
      Alert.alert('Please Select Questions!');
      return;
    }

    let res = await firestore.addGames({
      AwayTeam,
      HomeTeam,
      "Join Code": JoinCode,
      questions
    });
    Alert.alert('Success!');
    // navigation.replace("Teams");
  }

  // add  a question
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
        translucent={false}//Specifies whether the status bar is transparent. When set to true, the application will draw under the status bar (so-called "immersive" - partially covered by the status bar). Often used with a status bar with a semi-transparent background color.
        barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
      />
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled>

          <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

            <View style={{ backgroundColor: "#fff" }}>
              <View style={styles.row}>
                <Text style={styles.label}>AwayTeam</Text>
                <TextInput style={styles.input} placeholder='Input AwayTeam' value={AwayTeam} onChangeText={(text) => {
                  setAwayTeam(text);
                }}></TextInput>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>HomeTeam</Text>
                <TextInput style={styles.input} placeholder='Input HomeTeam' value={HomeTeam} onChangeText={(text) => {
                  setHomeTeam(text);
                }}></TextInput>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Join Code</Text>
                <TextInput style={styles.input} placeholder='Input Join Code' value={JoinCode} onChangeText={(text) => {
                  setJoinCode(text);
                }}></TextInput>
              </View>

              <View >
                <Text style={styles.label}>Questions</Text>
              </View>
              {
                questions.map((item, index) => {
                  return <View key={item.id} style={{ backgroundColor: "#eee", padding: 10, margin: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 15 }}>{item.question}</Text>
                      <Text style={{ color: "#888", marginTop: 10, fontSize: 17, color: "#ff4544" }}>{item['duration']}s</Text>

                    </View>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer1:{item['answer1']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer2:{item['answer2']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer3:{item['answer3']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer4:{item['answer4']}</Text>
                    <Text style={{ color: "#888", marginTop: 10, fontSize: 17, color: "#ff4544" }}>Correct answer:{item['correctanswer']}</Text>
                    <Button title='Remove' onPress={() => {
                      questions.splice(index, 1);
                      setQuestions([...questions]);
                    }}></Button>
                  </View>
                })
              }
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(true);
                }}>
                  <View style={styles.addbutton}>
                    <Text style={{ fontSize: 13, color: "#fff" }}>Add Question</Text>
                  </View>
                </TouchableOpacity>
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
      <Modal
        animationType="slide"
        presentationStyle={"fullScreen"}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}

      >

        <View style={{ backgroundColor: '#ffffff' }}>
          <ScrollView>
            <View style={{ height: 50 }}></View>
            <View style={styles.container}>

              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
                setModalVisible(false);
              }}>
                <View style={styles.addbutton}>
                  <Text style={{ fontSize: 13, color: "#fff" }}>Close</Text>
                </View>
              </TouchableOpacity>

              {
                list.map((item) => {

                  if (questions.find(it => it.id === item.id)) {
                    return <></>
                  }
                  return <View style={{ backgroundColor: "#eee", padding: 10, margin: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 15 }}>{item.question}</Text>
                      <Text style={{ color: "#888", marginTop: 10, fontSize: 17, color: "#ff4544" }}>{item['duration']}s</Text>

                    </View>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer1:{item['answer1']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer2:{item['answer2']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer3:{item['answer3']}</Text>
                    <Text style={{ color: "#888", marginTop: 10 }}>Answer4:{item['answer4']}</Text>
                    <Text style={{ color: "#888", marginTop: 10, fontSize: 17, color: "#ff4544" }}>Correct answer:{item['correctanswer']}</Text>
                    <Button title='Add' onPress={() => {
                      add(item);
                    }}></Button>
                  </View>
                })
              }
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View >
  );
}

