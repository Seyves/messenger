import React, { useState } from 'react';
import sendIcon from '../img/send.svg'

export default function SendField({sendMessage}){	
	const [field, setField] = useState('')

	function onSend(e){
		e.preventDefault()
		if(field.match(/^\s*$/)) return
		sendMessage(field)
		setField('')
	}

	return(
		<form className="chat__form">
			<input className="chat__input input" 
				placeholder='Your message...'
				onChange={e => setField(e.target.value)} 
				value={field} 
				onKeyPress={e => {if(e.key === 'Enter') onSend(e)}}
			/>
			<button className="chat__submit" >
				<img src={sendIcon} alt="" onClick={e => onSend(e)}/>
			</button>
		</form>
	)
}