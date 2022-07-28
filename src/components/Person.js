import React from 'react';

export default function Person({name, photoURL, status, subInfo, handleClick}){
	if(!name || !photoURL) return
	return(
		<section onClick={handleClick} className={"person " + (status == 'online' ? 'isOnline' : status == 'away' ? 'isAway' : status == 'offline' ? 'isOffline' : '')}>
			<div className="person__avatar"><img src={photoURL} alt="" loading="lazy"/></div>
			<div className='person__info'>
				<h2 className="person__name">{name}</h2>
				<p className="person__sub-info">{subInfo ?? status}</p>
			</div>				
		</section>
	)	
}