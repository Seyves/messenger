import { doc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import {timeshtampToTime} from '../functions/timefuncs';
import Dialog from './Dialog';

export default function Dialogs({chatsData, setCurrentChat}){
	const dialogElems = chatsData.map(chatData => 
		<Dialog 
			chatData={chatData} 
			changeCurrentChat={() => setCurrentChat(chatData.companion.email)}
			lastMesTime={timeshtampToTime(chatData?.messages[chatData.messages.length - 1]?.createdAt)}
			unreadMes={chatData.unreadMes}
			key={chatData.companion.email}
		/>
	)
		
	useEffect(() => {
		const dialogs = document.querySelector('.dialogs')
		const observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				if(entry.contentRect.width < 200) dialogs.classList.add('dialogs_min')
				else dialogs.classList.remove('dialogs_min')
			})
	  	}, {})
		observer.observe(dialogs)
		return () => observer.unobserve(dialogs)
	}, [])

	return (
		<div className={'dialogs'}>
			<div className="dialogs__top">
				<h2 className='dialogs__title'>Dialogs</h2>				
			</div>				
			<div className='dialogs__box'>
				{dialogElems}
			</div>			
		</div>
	)
}