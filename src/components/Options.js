import React from 'react';
import dialogsIcon from '../img/dialogsIcon.svg'

export default function Options({toggleDialogs}){
	return(
		<div className='options'>
			<div className='options__dialogs-icon' onClick={toggleDialogs}>
				<svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
					<defs>
						<clipPath id="clip-path">
							<rect id="Прямоугольник_141" data-name="Прямоугольник 141" width="24" height="24" transform="translate(27 140)" fill="#fff" stroke="#707070"/>
						</clipPath>
					</defs>
					<g id="Группа_масок_38" data-name="Группа масок 38" transform="translate(-27 -140)">
						<g id="category" transform="translate(27 140)">
							<path id="Контур_286" data-name="Контур 286" d="M7,11.5a7.482,7.482,0,0,1,.228-2.648A3,3,0,0,1,8.852,7.228,7.482,7.482,0,0,1,11.5,7a7.482,7.482,0,0,1,2.648.228,3,3,0,0,1,1.624,1.624A7.482,7.482,0,0,1,16,11.5a7.482,7.482,0,0,1-.228,2.648,3,3,0,0,1-1.624,1.624A7.482,7.482,0,0,1,11.5,16a7.482,7.482,0,0,1-2.648-.228,3,3,0,0,1-1.624-1.624A7.482,7.482,0,0,1,7,11.5Z" transform="translate(-7 -7)" fill="#fff"/>
							<path id="Контур_287" data-name="Контур 287" d="M24.5,11.5a7.484,7.484,0,0,1,.228-2.648,3,3,0,0,1,1.624-1.624A7.482,7.482,0,0,1,29,7a7.482,7.482,0,0,1,2.648.228,3,3,0,0,1,1.624,1.624A7.484,7.484,0,0,1,33.5,11.5a7.484,7.484,0,0,1-.228,2.648,3,3,0,0,1-1.624,1.624A7.482,7.482,0,0,1,29,16a7.482,7.482,0,0,1-2.648-.228,3,3,0,0,1-1.624-1.624A7.484,7.484,0,0,1,24.5,11.5Z" transform="translate(-9.5 -7)" fill="#fff"/>
							<path id="Контур_288" data-name="Контур 288" d="M7,29a7.482,7.482,0,0,1,.228-2.648,3,3,0,0,1,1.624-1.624A7.484,7.484,0,0,1,11.5,24.5a7.484,7.484,0,0,1,2.648.228,3,3,0,0,1,1.624,1.624A7.482,7.482,0,0,1,16,29a7.482,7.482,0,0,1-.228,2.648,3,3,0,0,1-1.624,1.624A7.484,7.484,0,0,1,11.5,33.5a7.484,7.484,0,0,1-2.648-.228,3,3,0,0,1-1.624-1.624A7.482,7.482,0,0,1,7,29Z" transform="translate(-7 -9.5)" fill="#fff"/>
							<path id="Контур_289" data-name="Контур 289" d="M24.5,29a7.484,7.484,0,0,1,.228-2.648,3,3,0,0,1,1.624-1.624A7.484,7.484,0,0,1,29,24.5a7.484,7.484,0,0,1,2.648.228,3,3,0,0,1,1.624,1.624A7.484,7.484,0,0,1,33.5,29a7.484,7.484,0,0,1-.228,2.648,3,3,0,0,1-1.624,1.624A7.484,7.484,0,0,1,29,33.5a7.484,7.484,0,0,1-2.648-.228,3,3,0,0,1-1.624-1.624A7.484,7.484,0,0,1,24.5,29Z" transform="translate(-9.5 -9.5)" fill="#fff"/>
						</g>
					</g>
				</svg>
			</div>
		</div>
	)	
}