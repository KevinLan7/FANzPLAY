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
      load();
    })()
  }, []);
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
        animated={false} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
        hidden={false}  //是否隐藏状态栏。
        networkActivityIndicatorVisible={false}//仅作用于ios。是否显示正在使用网络。
        showHideTransition={'fade'}//仅作用于ios。显示或隐藏状态栏时所使用的动画效果（’fade’, ‘slide’）。
        backgroundColor='rgba(255,255,255,0)'// {'transparent'} //状态栏的背景色
        translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
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