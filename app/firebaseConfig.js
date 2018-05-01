import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCEpdv7CU7W5ZX7bGJoiYjFm9wSNfxm5ic',
  authDomain: 'certificate-circuit.firebaseapp.com',
  databaseURL: 'https://certificate-circuit.firebaseio.com',
  projectId: 'certificate-circuit',
  storageBucket: 'certificate-circuit.appspot.com',
  messagingSenderId: '597184051940',
  timestampsInSnapshots: true
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const storageRef = firebase.storage().ref()
export const firestore = firebase.firestore()
export const applicationsRef = firestore.collection('applications')
export const usersRef = firestore.collection('users')
export const coursesRef = firestore.collection('courses')

// export const FieldValue = firebase.firestore.FieldValue

export default firebase
