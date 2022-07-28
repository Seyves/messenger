import React from 'react';
import AddPerson from './AddPerson';

export default function Nav(props){
	const SignOutButton = props.signOutButton	

	return(
		<header className='nav'>
			<AddPerson />						
			<SignOutButton />	
		</header>
	)	
}