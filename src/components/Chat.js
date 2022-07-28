import React, { useContext, useEffect} from 'react';
import Person from './Person';
import Message from './Message';
import SendField from './SendField';
import hash from '../functions/hash';
import { timeshtampToTime, timeshtampToDate, isNotSameDate, isToday, isYesterday } from '../functions/timefuncs';
import {Context} from '../App'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Chat({chatData, sendMessage}){
	if(!chatData) return	<div className='chat'></div>

	const {firestore, auth} = useContext(Context)
	const [user] = useAuthState(auth)	

	useEffect(() => {		
		const chatWindow = document.querySelector('.chat__window')		
		chatWindow.scrollTop = chatWindow.scrollHeight
		
		if(chatData.messages[chatData.messages.length-1]?.sender == user.email) return

		const id = hash(user.email, chatData.companion.email)
		firestore.collection('chats').doc(id).update({
			isRead: true,
			lastRead: new Date()
		})
	}, [chatData.messages.length])

	const messageElems = Object.keys(chatData.messages).length === 0 ? null :
	chatData.messages.map((message, index, array) => 
		{	
			const mesDate = timeshtampToDate(message.createdAt)
			const prevMesDate = timeshtampToDate(array[index-1]?.createdAt)

			if(isNotSameDate(mesDate, prevMesDate)) {
				return ( 
					<>
						<div className='date'>
							{ isToday(mesDate) ? 'Today' : isYesterday(mesDate) ? 'Yesterday' :
							`${mesDate.getDate()} ${mesDate.toLocaleString('default', { month: 'long' })}, ${mesDate.getFullYear()}`	}
						</div>
						<Message 
							isSender={message.sender == user.email}
							text={message.text}
							time={timeshtampToTime(message.createdAt)}
							key={message.createdAt}							
						/>						
					</>
				)
			}

			return (<Message 
				isSender={message.sender == user.email}
				text={message.text}
				time={timeshtampToTime(message.createdAt)}
				key={message.createdAt}
			/>)
		}
	)
	
	return(
		<div className='chat'>
			<div className='chat__header'>
				<Person name={chatData.companion.displayName} photoURL={chatData.companion.photoURL} status={chatData.companion.status}/>
			</div>
			<div className="chat__window" >
				<div className="chat__band">
					{messageElems || <div className='placeholder placeholder__empty-dialog'>This dialog is empty</div>}	
				</div>				
			</div>	
			<div className='chat__bottom'>
				<SendField sendMessage={sendMessage.bind(null, chatData.companion.email)}/>
			</div>					
		</div>
	)	
}