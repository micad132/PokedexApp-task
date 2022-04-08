import React , {useState} from 'react';

export default function ThemeButton(){

	const [textContent,setTextContent]  = useState('DARK THEME');

	const changeTheme  = () : void =>{

		document.body.classList.toggle('darktheme');
		if(textContent === 'DARK THEME'){
			setTextContent('LIGHT THEME');
		}
		else{
			setTextContent('DARK THEME');
		}
	}

	return(


		<button className="buttonStyle" onClick={()=> changeTheme()}>{textContent}</button>


	);
}