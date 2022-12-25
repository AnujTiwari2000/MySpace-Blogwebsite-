// install firebase via "npm install firebase"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// const functions = require('firebase-functions');
// const admin = require('firebase-admin')

// admin.initializeApp()

const app = firebase.initializeApp({
    apiKey: "AIzaSyDGecQRj-kInxEI3heqRAhOzwJkk-srm_Y",
  authDomain: "blogwebapp-9527d.firebaseapp.com",
  databaseURL: "https://blogwebapp-9527d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blogwebapp-9527d",
  storageBucket: "blogwebapp-9527d.appspot.com",
  messagingSenderId: "33858816205",
  appId: "1:33858816205:web:c9f044524f8879cd678184",
  measurementId: "G-QDB75WLX1R"
})


export const auth = app.auth()
export const storage = app.storage()
export const database = app.database()
export default app