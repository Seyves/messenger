export function timeshtampToTime(timeshtamp){
	if(!timeshtamp) return
	const date = new Date(timeshtamp.seconds * 1000 + timeshtamp.nanoseconds/1000000)
	let hours = date.getHours().toString()
	let minutes = date.getMinutes().toString()
	if(minutes.length < 2) minutes = "0" + minutes
	return `${hours}:${minutes}`	
}

export function timeshtampToDate(timeshtamp){
	if(!timeshtamp) return
	return new Date(timeshtamp.seconds * 1000 + timeshtamp.nanoseconds/1000000)	 
}

export function isNotSameDate(dateA, dateB){
	return dateA.getDate() != dateB?.getDate() || 
	dateA.getMonth() != dateB?.getMonth() ||	
	dateA.getFullYear() != dateB?.getFullYear()
}

export function isToday(date){					
	const today = new Date()

	return today.getDate() == date.getDate() && 
	today.getMonth() == date.getMonth() && 
	today.getFullYear() == date.getFullYear()
}

export function isYesterday(date){
	let yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	return yesterday.toDateString() === date.toDateString()
}