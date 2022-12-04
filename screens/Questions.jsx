import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Button, Alert, RefreshControl } from 'react-native';
import { GlobalColors } from '../constants/styles';
import { useState, useEffect } from "react";
// import { collection, onSnapshot } from 'firebase/firestore';
import { queryQuestions, deleteQuestions } from '../firebase/firestore';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { async } from '@firebase/util';

function Questions({ navigation, route }) {
  const [list, setList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    load();
  }, []);

  // load questions
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
    setIsRefreshing(false);
  }

  // remove question
  const remove = async (item) => {
    Alert.alert(
      '',
      `Confirm delete?`
      [
      {
        text: 'confirm', onPress: async () => {
          let res = await deleteQuestions(item.id);
          load()
        }
      },
      {
        text: 'cancel', onPress: () => {

        }
      }
      ]
    )


  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}

          onRefresh={() => {
            load();
          }}
          tintColor="#ff0000"
          title="Loading..."
          titleColor="#00ff00"
          // size={30}
          // progressViewOffset={30}
          colors={['#0000ff', '#ff0000', '#00ff00',]}
          progressBackgroundColor="#ffff00"
        />
      }>

      <View >
        <TouchableOpacity style={{ justifyContent: "flex-end", flexDirection: "row", width: "100%" }} onPress={() => {
          navigation.navigate("AddQuestions");
        }}>
          <Ionicons name='add-circle-outline' size={30}></Ionicons>
        </TouchableOpacity>
        {
          list.map((item) => {
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
              <Button title='delete' onPress={() => {
                remove(item);
              }} width={70} style={{ width: 70 }}></Button>
            </View>
          })
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalColors.colors.mediumpurple,
    flex: 1,
  },
});

export default Questions;