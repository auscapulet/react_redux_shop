import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyCsIt537AWyKCyb5DP4jUTi_OhBUSu65zE",
  authDomain: "crown-db-86c99.firebaseapp.com",
  databaseURL: "https://crown-db-86c99.firebaseio.com",
  projectId: "crown-db-86c99",
  storageBucket: "crown-db-86c99.appspot.com",
  messagingSenderId: "893746332656",
  appId: "1:893746332656:web:2e04b52f3fdd0c16639335",
  measurementId: "G-6XK6N2JZ49"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
