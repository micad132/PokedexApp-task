import axios from 'axios';
import React, {useEffect , useState} from 'react';
import ScrollToTop from "react-scroll-to-top";
import './App.css';

function App() {

	const [sprite,getSprite] = useState('');
	const [pokemonDetails, getpokemonDetails] = useState<Array<any>>([]);
	const [pokemonData,getpokemonData] = useState<Array<PokemonDetails>>([]);
	const [isDetails,setisDetails] = useState(false);
	const [weightArr,setWeight] = useState<Array<any>>([]);
	const [heightArr,setHeight] = useState<Array<any>>([]);
	const [nameArr,setName] = useState<Array<any>>([]);
	const [typesArr,setTypes] = useState<Array<any>>([]);
	const [spritesArr,setspritesArr] = useState<Array<any>>([]);
	const [offset,setOffset] = useState<number>(0);
	
	
	
	let details : any;

	

	interface Sprites {

		front_default: string,
		
	}

	

	interface PokemonDetails{

		
		height: number,
		weight: number,
		name: string,
		sprites: Sprites
		
		

	}

	interface Pok{

		pokemon: PokemonDetails
	}

	interface PokemonProp{

		url: string,
		name: string,
		
		
	}

	

	useEffect( ()=> {


		

		
		// const heightArray : Array<PokemonDetails> = [];
		// const weightArray : Array<PokemonDetails> = [];
		// const spritesArray : Array<PokemonDetails> = [];
		// const namesArray : Array<PokemonDetails> = [];
		
		
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
		.then(async res => {
			
			
			
			//getpokemonData(res.data.results);
			
			//fetchingDetails(pokemonData[5]);
			

			const pokeProps: Array<PokemonProp> = res.data.results;

			
		 

				//console.log(1,pok);
				//fetchingDetails(pok);
				
				 for(let i=0;i<pokeProps.length;i++){

					const data = await axios.get(pokeProps[i].url);
					const {name,weight,height , sprites} = data.data;
				
						
						
					pokemonData.push({name,weight,height,sprites});
					getpokemonData([...pokemonData]);
					// axios.get(pokeProps[i].url)
					// .then( res => {
			
					// 	const {name,weight,height , sprites} = res.data;
						
						
					// 	pokemonData.push({name,weight,height,sprites});
					// 	getpokemonData(pokemonData);
					// 	// heightArray.push(height);
					// 	// weightArray.push(weight);
					// 	// spritesArray.push(sprites);
					// 	// nameArr.push(name);
						
					// 	// pokeProps[i].sprites = sprites;
						
						
						
					// 	// setTypes(typesArr => [...typesArr,types]);
					// 	// setspritesArr(spritesArr => [...spritesArr, sprites]);
						
						
					// })
					// .catch( err =>{
			
					
					// 	console.log(err);
					// 	throw err;
					// })



				 }
					
			
					
			
			
			
		})
		.catch( err => {
			
			console.log(err);
			throw err;
		})

		// setHeight(heightArray);
		// setWeight(weightArray);
		// setspritesArr(spritesArray);
		// setName(namesArray);
		
		//getpokemonData(spritesArray);
		
		
		console.log('jd');
		

	},[offset])


	

	// const fetchingDetails = (url: any) => {

		
	// 	let cos = url.url;
	// 	console.log(2, cos);

	// 	const getDetails = async () =>{

	// 	await axios.get(cos)
	// 	.then( res => {

	// 		const {weight,height , types, sprites} = res.data;
	// 		let sprite = sprites;
	// 		setHeight( heightArr => [...heightArr , height]);
	// 		setWeight(weightArr => [...weightArr, weight]);
	// 		setTypes(typesArr => [...typesArr,types]);
	// 		setspritesArr(spritesArr => [...spritesArr, sprites]);
			
	// 	})
	// 	.catch( err =>{

		
	// 		console.log(err);
	// 		throw err;
	// 	})

	// 	}
		
	// }

	const PokemonInfo = ( {pokemon} : Pok)  => {

		
		
	  	return <div className='infoDiv'>
	  		<p> Weight: {pokemon.weight}</p>
	  		<p> height: {pokemon.height}</p>
			 
	  	</div>
	 }

	 const fetchDetails = () => {

		
	 	if(isDetails === false){
	 		setisDetails(true);
	 	}
	 	else{
	 		setisDetails(false);
	 	}

	}
		
		
		// console.log('siema');
		// const divv = document.querySelectorAll('.detailsDiv');
		

		// divv.forEach( item => {

		// 	item.addEventListener('click',()=> {

		// 		item.classList.toggle('hidden');
		// 	})
		// })
		// if(isDetails){
		// 	setisDetails(false);
		// }
		// else{
		// 	setisDetails(true);
		// }
		
		// axios.get(api)
		// .then( res => {

		// 	const {weight,height} = res.data;
		// 	//setPokemonInfo(weight,height);
			
		// })
		// .catch( err => console.log(err))

		

		
	//}

	const addMorePokemons = ()=>{

		let off = offset;
		off = off +20;
		setOffset(off);
	}

	const changeTheme = ()=> {

	 	document.body.classList.toggle('darktheme');
		
	 }

  return (
    <div className="App">
       <h1>Catalogue of Pokémon.</h1>
	   <button className="themeChange" onClick={() => changeTheme()}>THEME</button>
	  
	   <button className="addPokemons" onClick={()=> addMorePokemons()}>Add more</button>
	   <ScrollToTop smooth={true}   style={{top: 50}}/>
	   <ul>
	   		
	   		
		   {
			   
			   
			    pokemonData.map((pokemon,index) =>
				
				

				
			   
					<li key={pokemon.name}>

						<div id="pokemon-div" onClick={ () => fetchDetails()}>
							<p className="pokemonName">{pokemon.name}</p>
								{isDetails &&  <PokemonInfo  pokemon={pokemon}/>}
								{/* <div className='detailsDiv'> 
									<p>Height: {heightArr[index]}</p>
									<p>Weight: {weightArr[index]}</p>
							</div> */}
							
							{console.log(pokemon.sprites)}
							<img src={pokemon.sprites.front_default} alt="imageof" />   
								
							
							

						</div>
					</li>)
				
				
			  
		   }
	   </ul>
	   
    </div>

  );
}

export default App;
