import React from 'react';
import Person from './Person';

export default function Dialog({chatData, changeCurrentChat, lastMesTime, unreadMes}){
	return(
		<article className='dialog' onClick={changeCurrentChat}>
			<Person name={chatData.companion.displayName} photoURL={chatData.companion.photoURL} subInfo={ chatData.messages[chatData.messages.length-1]?.text} status={chatData.companion.status}/>
			<div className="dialog__meta">
				<div className="dialog__last-mes-time">{lastMesTime}</div>
				{unreadMes && <div className="dialog__unread-mes-count">{unreadMes}</div>}
			</div>			
		</article>
	)	
}