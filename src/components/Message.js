import React from 'react';

export default function Message({isSender, text, time}){
	return(
		<div className={'message' + (isSender ? ' giving' : ' receiving')}>
			<div className="message__body">
				<p className="message__text">{text}</p>
				<footer className="message__time">{time}</footer>				
			</div>					
		</div>
	)	
}