import React, { useState } from "react"

export default function Popup({text, isActive, close}){
	return (
		<div className={'popup ' + (isActive ? 'active' : '')}>
			<div className='popup__body'>
				<div className="popup__content">
					<p>{text}</p>
					<button className='popup__button' onClick={close} type='button'>OK</button>
				</div>							
			</div>
		</div>
	)
}