import { collection, addDoc, deleteDoc, query, doc, where, getDocs, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase-setup";

export async function writeToDB(item) {
  console.log("item===", item)
  try {
    const docRef = await addDoc(collection(firestore, "expenses"), item);
  } catch (err) {
    console.log(err);
  }
}


export async function updateToDB(item, key) {
  console.log("item===", item)
  try {
    const docRef = await updateDoc(doc(firestore, "expenses", key), item);
  } catch (err) {
    console.log(err);
  }
}

export async function queryExpense() {
  try {
    const docRef = await getDocs(collection(firestore, "expenses"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}

export async function queryExpenseImportant() {
  try {
    const docRef = await getDocs(query(collection(firestore, "expenses"), where("important", "==", true)));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}

export async function markImportant(id) {
  try {
    const docRef = await getDocs(collection(firestore, "expenses"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}



export async function deleteExpense(key) {
  try {
    await deleteDoc(doc(firestore, "expenses", key));
  } catch (err) {
    console.log(err);
  }
}