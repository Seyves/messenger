import React from 'react';
import logo from '../img/logo.svg'

export default function Logo(){
	return(
		<div className='logo'>			
			<img className="logo__image" src={logo} alt=''></img>
		</div>
	)	
}