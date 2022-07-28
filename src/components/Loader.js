import React from 'react';
import Container from "./Container"

export default function Loader(){
	return (
		<Container>
			<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</Container>		
	)
}