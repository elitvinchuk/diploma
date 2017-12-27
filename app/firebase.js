import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCEpdv7CU7W5ZX7bGJoiYjFm9wSNfxm5ic',
  authDomain: 'certificate-circuit.firebaseapp.com',
  databaseURL: 'https://certificate-circuit.firebaseio.com',
  projectId: 'certificate-circuit',
  storageBucket: 'certificate-circuit.appspot.com',
  messagingSenderId: '597184051940'
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()