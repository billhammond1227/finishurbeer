import * as firebase from 'firebase';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyAgmX4Tw41HKxLA95xLWUGWOe4pG5h1sLY",
    authDomain: "finishurbeer-a108c.firebaseapp.com",
    databaseURL: "https://finishurbeer-a108c.firebaseio.com",
    projectId: "finishurbeer-a108c",
    storageBucket: "finishurbeer-a108c.appspot.com",
    messagingSenderId: "558515325381",
    appId: "1:558515325381:web:7c9761622701784e3663ac"
  };

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export {database, storage}