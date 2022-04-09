import axios from 'axios';
import React, {useEffect , useState} from 'react';
import ScrollToTop from "react-scroll-to-top";
import './App.css';
import PokemonList from './components/PokemonList';
import ThemeButton from './components/ThemeButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

import {Sprites,TypeData,Types,PokemonDetails,Pok,PokemonProp} from './interfaces/interfaces';

function App() {

	
	
	const [pokemonData,setPokemonData] = useState<Array<PokemonDetails>>([]);
	const [isDetails,setisDetails] = useState(false);
	const [offset,setOffset] = useState<number>(0);
	const [isLoading,setIsLoading] = useState<boolean>(false);
	


	useEffect( ()=> {

		
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
		.then(async res => {
			
				

				const pokeProps: Array<PokemonProp> = res.data.results;
	
				 for(let i=0;i<pokeProps.length;i++){

					const data = await axios.get(pokeProps[i].url);
					const {name,weight,height , sprites,types} = data.data;					
					pokemonData.push({name,weight,height,sprites,types});
					setPokemonData([...pokemonData]);
					

				 }
									
				 setIsLoading(true);
			
			
		})
		
		.catch( err => {
			
			console.log(err);
			throw err;
		})


	},[offset])



	const sortingASCByFirstType = () =>  {


			const sorted = [...pokemonData].sort((a,b)=>{

				return a.types[0].type.name.toLowerCase() > b.types[0].type.name.toLowerCase() ? 1: -1;
			})

			setPokemonData(sorted);


	}

	const sortingDESCByFirstType = () => {


		const sorted = [...pokemonData].sort((a,b)=>{

			return a.types[0].type.name.toLowerCase() < b.types[0].type.name.toLowerCase() ? 1: -1;
		})

		setPokemonData(sorted);


}

	const sortingASCByName = () => {

		const sorted = [...pokemonData].sort((a,b)=>{

			return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
		})

		setPokemonData(sorted);
	}

	const sortingDESCByName = () => {

		const sorted = [...pokemonData].sort((a,b)=>{

			return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
		})

		setPokemonData(sorted);
	}

	const addMorePokemons = () : void =>{

		let off = offset;
		off = off +20;
		setOffset(off);
		toast.success('More pokemons added!', {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			});
	}

	

  return (
    <div className="App">
       <h1>Catalogue of Pokémon.</h1>
	   
	   <button className="buttonStyle" onClick={()=> addMorePokemons()}>Add more</button>
	   
		<ThemeButton/>
		<ToastContainer />
	   <div className="sorting">

		<div className="sortingByName">
			<h2 className='sortingByName__title fontColor'>Sorting by name</h2>
			<button className="buttonStyle" onClick= {()=> sortingASCByName()}>Sort ASC</button>
			<button className="buttonStyle" onClick= {()=> sortingDESCByName()}>Sort DESC</button>

		</div>
	    
		<div className="sortingByName">
			<h2 className='sortingByName__title fontColor'>Sorting by type</h2>
			<button className="buttonStyle" onClick= {()=> sortingASCByFirstType()}>Sort ASC</button>
			<button className="buttonStyle" onClick= {()=> sortingDESCByFirstType()}>Sort DESC</button>

		</div>

	   </div>
	   
	   
	   <ScrollToTop smooth={true}   style={{top: 50}}/>
	   {isLoading? <PokemonList pokemonData={pokemonData}/> : <ClipLoader   color={'orange'}size={50} />}
	   
	   
    </div>

  );
}

export default App;
