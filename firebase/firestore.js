import { collection, addDoc, deleteDoc, query, doc, where, getDocs, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase-setup";


export async function queryTeams() {
  try {
    const docRef = await getDocs(collection(firestore, "teams"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}
export async function addTeams(item) {
  console.log("item===", item)
  try {
    const docRef = await addDoc(collection(firestore, "teams"), item);
    return docRef;
  } catch (err) {
    console.log(err);
  }
}

export async function addGames(item) {
  console.log("item===", item)
  try {
    const docRef = await addDoc(collection(firestore, "games"), item);
    return docRef;
  } catch (err) {
    console.log(err);
  }
}


export async function addQuestions(item) {
  console.log("item===", item)
  try {
    const docRef = await addDoc(collection(firestore, "questions"), item);
    return docRef;
  } catch (err) {
    console.log(err);
  }
}


export async function queryGames() {
  try {
    const docRef = await getDocs(collection(firestore, "games"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}

export async function queryQuestions() {
  try {
    const docRef = await getDocs(collection(firestore, "questions"));
    return docRef;
  } catch (err) {
    console.log(err);
  }
}



export async function deleteQuestions(key) {
  try {
    await deleteDoc(doc(firestore, "questions", key));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteGames(key) {
  try {
    await deleteDoc(doc(firestore, "games", key));
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTeams(key) {
  try {
    await deleteDoc(doc(firestore, "teams", key));
  } catch (err) {
    console.log(err);
  }
}