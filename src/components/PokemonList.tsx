import { url } from "inspector";
import React,{useState,useEffect} from "react";
import { JsxElement } from "typescript";
import { PokemonDetails,Pok } from "../interfaces/interfaces";

interface CompProps{

	pokemonData: Array<PokemonDetails>
}

export default function PokemonList({pokemonData}:CompProps){


	const [isDetails,setisDetails] = useState(false);
	const [isOpen,setIsOpen] = useState<Array<boolean>>([]);


	useEffect(()=> {

		setIsOpen(pokemonData.map(pok => false))

	},[pokemonData])
    

   const PokemonInfo = ( {pokemon} : Pok) : JSX.Element  => {

		
		
	return <div className='infoDiv'>
		<p> Weight: {pokemon.weight}</p>
		<p> height: {pokemon.height}</p>
	   
	</div>
}

	const showDetails = (index : number) : void => {

		
		isOpen[index] = !isOpen[index];
		setIsOpen([...isOpen]);

	}


	return(

		<ul>
	   		   		
		   {
			    
			    pokemonData.map((pokemon,index) =>
					   
					<li key={pokemon.name} className="fontColor" >

						<div id="pokemon-div" onClick={ () => showDetails(index)}>
							<p className="pokemonName">{pokemon.name}</p>
							
								<h4>Type:</h4>
								{pokemon.types.map(type => `${type.type.name}\n`)}
								{isOpen[index] &&  <PokemonInfo  pokemon={pokemon}/>}
								
												
							<img className="pokemonImg" src={pokemon.sprites.front_default} alt="imageof" />   
								
							
						</div>
					</li>)
					  
		   }
	   </ul>


	);
}