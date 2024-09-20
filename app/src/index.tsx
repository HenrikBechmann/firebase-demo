// index.tsx

import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'

import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect, 
    getRedirectResult
} from "firebase/auth"

import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account',
})

const SignIn = () => {

    const [testState, setTestState] = useState('ready')

    useEffect (()=>{

        getRedirect()

    },[])

    const callRedirect = () => {

        setTestState('redirect')

    }

    const callPopup = () => {

        setTestState('popup')

    }

    useEffect (()=>{

      if (testState == 'popup') {

        doPopup()

      } else if (testState == 'redirect') {

        signInWithRedirect(auth, provider)

      }

    },[testState])

    async function doPopup() {

        await signInWithPopup(auth, provider)
        .then((result) => {

            const user = result.user
            
            if (user) {

                console.log('user signed in with popup', user)

                setTestState('ready') // clear window

                alert('signed in with popup')

            }
        }).catch((error) => {
            const errorCode = error.code;
            console.log('popup error',error)
        });

    }

    const getRedirect = () => {

        getRedirectResult(auth)
        .then((user) => {

            if (user === null) {

                alert('user is currently null')

                return

            }

            if (user) {

                console.log('user signed in with redirect', user)

                alert('signed in with redirect')

            }

        }).catch((error) => {

            console.log('redirect error', error)

        });

    }

    return <>
      <div>Test for google sign in problem from localhost</div>
      <button onClick = {callRedirect}>Sign in with redirect</button>
      <button onClick = {callPopup} >Sign in with popup</button>
    </>
}

const root = createRoot(document.getElementById('root'))

root.render(
    <SignIn />
)