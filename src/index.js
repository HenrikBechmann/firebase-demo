// index.tsx

import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    getRedirectResult
} from "firebase/auth";

import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

(function () {

    document.querySelector('button').addEventListener('click',function () {
        signInWithRedirect(auth, provider);

    });

})();

(function () {

    getRedirectResult(auth)
    .then(function (user){

        if (user === null) {

            alert('user is currently null');

            return;

        }

        if (user) {

            console.log('user signed in with redirect', user);

            alert('signed in with redirect');

        }

    }).catch(function (error){

        console.log('redirect error', error);

    });

})();
