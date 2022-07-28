import React, { useContext, useState, useEffect } from 'react';
import hash from '../functions/hash';
import Popup from './Popup';
import Person from './Person';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import {Context} from '../App'

export default function AddPerson(){
	const {firestore, auth} = useContext(Context)
	const [user] = useAuthState(auth)
	const [users, loading] = useCollectionData(firestore.collection('users'))

	const [tabIsOpened, setTabIsOpened] = useState(false)
	const [personEmail, setPersonEmail] = useState('')
	const [errorCode, setErrorCode] = useState(null)

	useEffect(() => {
		document.addEventListener('click', e => {		
			if(document.querySelector('.add-person__search') == document.activeElement || e.target.closest('.add-person__tab')) return
			setTabIsOpened(false)
		})
	}, [])

	if(loading) return

	async function addPerson(event, email){
		event.preventDefault()
		console.log(email);
		if(email == user.email) return setErrorCode(3)
		
		const id = hash(user.email, email)

		const chat = await firestore.collection('chats').doc(id).get()
		if(chat.exists) return setErrorCode(2)

		firestore.collection('chats').doc(id).set({
			members: [user.email, email]
		});	
	}	

	const filteredUsers = users.filter(user => 
		user.email.toLowerCase().includes(personEmail.toLowerCase()) || 
		user.displayName.toLowerCase().includes(personEmail.toLowerCase())
	)
	
	const personElems = filteredUsers.map(user =>	
		<Person 
			name={user.displayName} 
			photoURL={user.photoURL} 
			subInfo={user.email} 
			key={user.email} 
			status={null} 
			handleClick={e => addPerson(e, user.email)}
		/>
	)

	return(
		<div className='add-person'>
			<form className='add-person__form'>				<input 
					className='add-person__search input' 
					type='text' 
					placeholder='Person email...' 
					value={personEmail}
					onFocus={() => setTabIsOpened(true)}
					onChange={e => setPersonEmail(e.target.value)}
				/>
				<div className={'add-person__tab ' + (tabIsOpened ? 'active' : '')}>
					<div className='add-person__tab-band'>
						{personElems == 0 ? <div className='placeholder placeholder_tab'>No persons found {':('}</div> : personElems}
					</div>
				</div>		
			</form>
			<Popup text="Oops, I think we do not have that user :(" isActive={errorCode == 1} close={() => setErrorCode(null)}></Popup>
			<Popup text="You already have that user in your dialogs!" isActive={errorCode == 2} close={() => setErrorCode(null)}></Popup>
			<Popup text="You can't add yourself!" isActive={errorCode == 3} close={() => setErrorCode(null)}></Popup>
		</div>		
	)
}