import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCEpdv7CU7W5ZX7bGJoiYjFm9wSNfxm5ic',
  authDomain: 'certificate-circuit.firebaseapp.com',
  databaseURL: 'https://certificate-circuit.firebaseio.com',
  projectId: 'certificate-circuit',
  storageBucket: 'certificate-circuit.appspot.com',
  messagingSenderId: '597184051940'
}

firebase.initializeApp(config)

export const auth = firebase.auth()
const firestore = firebase.firestore()

export const usersRef = firestore.collection('users')
export const coursesRef = firestore.collection('courses')

export const FieldValue = firebase.firestore.FieldValue

export default firebase
