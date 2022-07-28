import React, {useState, useContext, useEffect} from 'react';
import { ref, onValue } from 'firebase/database'
import { timeshtampToDate } from '../functions/timefuncs';
import Chat from './Chat';
import Split from 'react-split';
import Loader from './Loader';
import Dialogs from './Dialogs';
import hash from '../functions/hash';
import {Context} from '../App'

import { arrayUnion } from 'firebase/firestore';

import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Messenger(){	
	const {firestore, auth, db} = useContext(Context)

	const [user] = useAuthState(auth)
	const [data, loading] = useCollectionData(firestore.collection('chats'))

	const [currentChat, setCurrentChat] = useState(null)	
	const [chats, setChats] = useState([])

	function getCurrentChat(){		
		return chats.find(chat => chat.companion.email == currentChat)		
	}	

	async function sendMessage(email, text){
		const id = hash(user.email, email)
		
		firestore.collection('chats').doc(id).update({
			isRead: false,
			messages: arrayUnion({
				createdAt: new Date(),
				sender: user.email,
				text: text,
			})
		})
	}

	function handleData(){
		let userChats = data.filter(chat => chat.members.includes(user.email))	

		//Отбираем диалоги для конкретного пользователя
		userChats = userChats.map(chat => {
			const newObj = {
				messages: [],
				...chat
			}
			newObj.companion = {
				email: chat.members.find(person => person != user.email)
			}
			delete newObj.members
			return newObj
		})		
		//Сортируем диалоги по времени		
		userChats = userChats.sort((chatA, chatB) => {
			if(chatA.messages.length == 0) return -1
			if(chatB.messages.length == 0) return 1
			return chatA.messages[chatA.messages.length-1]?.createdAt.seconds < chatB.messages[chatB.messages.length-1]?.createdAt.seconds ?
				1 : -1			
		})		
		//Получаем данные о непрочитанных сообщениях
		userChats = userChats.map(chat => {
			if(chat.messages.length == 0) return chat
			if(chat.messages[chat.messages.length-1].sender == user.email) return chat
			if(chat.isRead) return chat
			let unreadMesCount = 0
			for(let i = chat.messages.length-1; i >= 0; i--){
				if(timeshtampToDate(chat.messages[i].createdAt) > timeshtampToDate(chat.lastRead)) unreadMesCount++
				else return {...chat, unreadMes: unreadMesCount}
			}
			return {...chat, unreadMes: unreadMesCount}
		})
		//Ищем данные для каждого собеседника
		async function getCompanionsInfo(){
			let shapshot = await firestore.collection('users').get()
			let users = shapshot.docs.map(doc => doc.data());

			return userChats.map(chat => {
				
				let correctUser = users.find(user => user.email == chat.companion.email)
				chat.companion.displayName = correctUser.displayName
				chat.companion.photoURL = correctUser.photoURL
				chat.companion.uid = correctUser.uid
				chat.companion.status = 'offline'
				return chat
			})
		}
		getCompanionsInfo().then( chatsData => {
			setChats(chatsData)
			return chatsData
		//Создаём слушатель на каждого собеседника для обновления состояния (онлайн, оффлайн, нет на месте)
		}).then(chatsData => {
			chatsData.forEach(chat => {
				const reference = ref(db, 'users/' + chat.companion.uid + '/status')		
				onValue(reference, snapshot => {
					setChats(prevValue => {
						const status = snapshot.val()						
						return prevValue.map(prevChat => {
							return chat.companion.uid == prevChat.companion.uid ? 
							{...prevChat, companion: {...prevChat.companion, status: status}} : prevChat
						})
					})			
				})
			})	
		})
	}

	useEffect(() => {
		if(loading) return
		handleData()	
	}, [data])

	if(loading) return <Loader />	

	return(	
		<Split 
			className='messenger'
			sizes={[25, 75]}
			minSize={[70, 300]}
			direction="horizontal"
			expandToMin={false}
			gutterSize={6}
			snapOffset={50}
			cursor="col-resize"
		>	
			<Dialogs chatsData={chats} setCurrentChat={setCurrentChat}/>
			<Chat chatData={getCurrentChat()} sendMessage={sendMessage}/>
		</Split>			
	)	
}