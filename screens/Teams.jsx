import { View, StyleSheet, TouchableOpacity, Text, Alert, Button, ScrollView, RefreshControl } from 'react-native';
import { GlobalColors } from '../constants/styles';
import { useState, useEffect } from "react";
// import { collection, onSnapshot } from 'firebase/firestore';
import { queryTeams, deleteTeams } from '../firebase/firestore';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

function Teams({ navigation, route }) {
  const [list, setList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let res = await queryTeams();
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

  const remove = async (item) => {
    Alert.alert(
      '', //提示标题
      `Confirm delete？`, //提示内容
      [
        {
          text: 'confirm', onPress: async () => {
            let res = await deleteTeams(item.id);
            load()
          }
        },
        {
          text: 'cancel', onPress: () => {

          }
        }
      ] //按钮集合
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
          navigation.navigate("AddTeam");
        }}>
          <Ionicons name='add-circle-outline' size={30}></Ionicons>
        </TouchableOpacity>
        {
          list.map((item) => {
            return <View style={{ backgroundColor: "#eee", padding: 10, margin: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <Text style={{ marginLeft: 20, color: "#888" }}>UserCount:{item.userCount}</Text>
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

export default Teams;