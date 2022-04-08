import { url } from "inspector";
import React,{useState} from "react";
import { JsxElement } from "typescript";
import { PokemonDetails,Pok } from "../interfaces/interfaces";

interface CompProps{

	pokemonData: Array<PokemonDetails>
}

export default function PokemonList({pokemonData}:CompProps){


	const [isDetails,setisDetails] = useState(false);


   const PokemonInfo = ( {pokemon} : Pok) : JSX.Element  => {

		
		
	return <div className='infoDiv'>
		<p> Weight: {pokemon.weight}</p>
		<p> height: {pokemon.height}</p>
	   
	</div>
}

	const showDetails = () : void => {

		setisDetails(!isDetails);

	}


	return(

		<ul>
	   		   		
		   {
			    
			    pokemonData.map((pokemon,index) =>
					   
					<li key={pokemon.name} className="fontColor" >

						<div id="pokemon-div" onClick={ () => showDetails()}>
							<p className="pokemonName">{pokemon.name}</p>
							
								<h4>Type:</h4>
								{pokemon.types.map(type => `${type.type.name}\n`)}
								{isDetails &&  <PokemonInfo  pokemon={pokemon}/>}
								{/* <div className='detailsDiv'> 
									<p>Height: {heightArr[index]}</p>
									<p>Weight: {weightArr[index]}</p>
							</div> */}
												
							<img className="pokemonImg" src={pokemon.sprites.front_default} alt="imageof" />   
								
							
						</div>
					</li>)
					  
		   }
	   </ul>


	);
}