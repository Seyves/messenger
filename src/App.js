import React, { createContext, useEffect, useState} from "react"
import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, onDisconnect } from 'firebase/database'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import {useAuthState} from 'react-firebase-hooks/auth'

import sighOut from './img/signOut.svg'
import Nav from "./components/Nav"
import Logo from "./components/Logo"
import Options from './components/Options'
import Messenger from './components/Messenger'
import Container from "./components/Container"
import Loader from "./components/Loader"
import "./App.scss"

firebase.initializeApp({
	apiKey: "AIzaSyD1arP1IRbgQeSMzCxyWyi_qotXFcU1pSM",
	authDomain: "messenger-e0727.firebaseapp.com",
	projectId: "messenger-e0727",
	storageBucket: "messenger-e0727.appspot.com",
	messagingSenderId: "592794739417",
	appId: "1:592794739417:web:efe10a62b38038243dd4c8",
	measurementId: "G-V5127Z6RMM"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const db = getDatabase()
const serviceObj = {
	db,
	firebase,
	auth,
	firestore
}

export const Context = createContext(null)

export default function App(){
	const [user, loading] = useAuthState(auth)
	const [isDialogsOpened, setIsDialogsOpened] = useState(true) 
	
	if(loading) return <Loader></Loader>

	const reference = ref(db, 'users/' + user?.uid)

	function setUserPresence(status){
		set(reference, {
			email: user.email,
			status: status
		})
	}

	function SingIn(){		
		const singInWithGoogle = () => {
			const provider = new firebase.auth.GoogleAuthProvider()
			auth.signInWithPopup(provider)
		}
		return (
			<Container>
				<div className='sign-in'>
					<h3 className='sign-in__title'>Hey, authorizate please {":)"}</h3>
					<button onClick={singInWithGoogle} className='sign-in__button'>Authorization with Google</button>
				</div>
			</Container>		
		)
	}	

	function SingOut(){
		return (
			<button onClick={() => {
				auth.signOut()
				setUserPresence('offline')				
			}} className='sign-out button'><p>Sign out</p> <img src={sighOut} alt=""/></button>
		)
	} 

	if(user){		
		setUserPresence('online')
		onDisconnect(reference).set({
			email: user.email,
			status: 'offline'
		})		

		document.onvisibilitychange = e => {
			if(document.visibilityState == 'hidden') setUserPresence('away')
			else setUserPresence('online')
		}

		firestore.collection('users').doc(user.uid).set({					
				photoURL: user.photoURL, 
				displayName: user.displayName,
				email: user.email,				
				uid: user.uid
		})
	}

	function toggleDialogs(){
		setIsDialogsOpened(prevValue => !prevValue)
	}

	return (		
		<>
			{	!user ? <SingIn /> :
				<Context.Provider value={serviceObj}>
					<div className={"wrapper " + (isDialogsOpened ? "dialogs-opened" : '')}>
						<Logo />
						<Nav signOutButton={SingOut}/>			
						<Options toggleDialogs={toggleDialogs}/>		
						<Messenger/>
					</div>	
				</Context.Provider>		
			}			
		</>		
	)
}