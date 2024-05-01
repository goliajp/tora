// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from '@firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmmmVRs3Zz0F-oDgqi0r6SVx_TgcfdUM8',
  authDomain: 'electron-tora-85f7a.firebaseapp.com',
  projectId: 'electron-tora-85f7a',
  storageBucket: 'electron-tora-85f7a.appspot.com',
  messagingSenderId: '270334834201',
  appId: '1:270334834201:web:d2de40dd6a0e876ba15c88',
  measurementId: 'G-107WKYWK9Q'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
