import {initializeApp} from "firebase/app"
import{getAuth} from "firebase/auth"

const firebaseConfig={
    apiKey: "AIzaSyCjjaIT_8xfYNgsWIQ75Oj-LbCNkAvOxPM",
    authDomain: "inf0122022.firebaseapp.com",
    projectId: "inf0122022",
    storageBucket: "inf0122022.appspot.com",
    messagingSenderId: "813334521776",
    appId: "1:813334521776:web:7f6db885737fe1c7709875"
}

const app=initializeApp(firebaseConfig);
var auth=null;
if(app){
    auth=getAuth();
}

export default auth;