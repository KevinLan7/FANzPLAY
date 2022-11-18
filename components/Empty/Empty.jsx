import { View, StyleSheet } from 'react-native';
import { GlobalColors } from '../constants/styles';
import { useState, useEffect } from "react";
import { queryExpense } from '../firebase/firestore';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

function Games() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    load();

  }, []);

  const load = async () => {
    let res = await queryExpense();
    console.log("res", res);

    let list = res.docs.map((snapDoc) => {
      let data = snapDoc.data();
      data = { ...data, id: snapDoc.id };
      return data;
    })
    console.log("list", list);
    setExpenses(list);
  }

  return (
    <View style={styles.container}>
      Empty Data
    </View>
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