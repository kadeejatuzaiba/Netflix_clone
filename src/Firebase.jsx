import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { exp } from "firebase/firestore/pipelines";
import { toast } from "react-toastify";
  import { setDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyB-eOqXHpK9aWnBISTVdxoxlGxmcDzl90w",
  authDomain: "netflix-clone-c3803.firebaseapp.com",
  projectId: "netflix-clone-c3803",
  storageBucket: "netflix-clone-c3803.firebasestorage.app",
  messagingSenderId: "141883797296",
  appId: "1:141883797296:web:a96a90abaf96d0af9ee2f5"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore(app)


const signup=async (name,email,password)=>{
    try {
    const res= await createUserWithEmailAndPassword(auth,email,password)
    const user=res.user;
    await setDoc(doc(db, "User", user.uid), {
  uid: user.uid,
  name,
  email,
  watchlist: []
});

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout=()=>{
    signOut(auth)
}

export{
    auth,db,login,signup,logout
}