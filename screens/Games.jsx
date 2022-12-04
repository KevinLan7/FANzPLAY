import { View, StyleSheet, TouchableOpacity, Text, Button, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { GlobalColors } from '../constants/styles';
import { useState, useEffect } from "react";
// import { collection, onSnapshot } from 'firebase/firestore';
import { queryGames, deleteGames } from '../firebase/firestore';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

function Games({ navigation, route }) {
  const [list, setList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState();

  useEffect(() => {
    load();
  }, []);

  // load game list
  const load = async () => {
    let res = await queryGames();
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


  // remove a game
  const remove = async (item) => {
    Alert.alert(
      '',
      `Confirm delete?`,
      [
        {
          text: 'confirm', onPress: async () => {
            let res = await deleteGames(item.id);
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
      <View>
        <TouchableOpacity style={{ justifyContent: "flex-end", flexDirection: "row", width: "100%" }} onPress={() => {
          navigation.navigate("AddGame");
        }}>
          <Ionicons name='add-circle-outline' size={30}></Ionicons>
        </TouchableOpacity>
        {
          list.map((item) => {
            return <View key={item.id} style={{ backgroundColor: "#eee", padding: 10, margin: 10, borderRadius: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>{item.AwayTeam}</Text>
                <Text style={{ fontSize: 30, color: "red", marginHorizontal: 20 }}>VS</Text>
                <Text style={{ fontSize: 15 }}>{item.HomeTeam}</Text>
              </View>
              <Text style={{ color: "#888", marginTop: 10 }}>Join Code:{item['Join Code']}</Text>
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

export default Games;