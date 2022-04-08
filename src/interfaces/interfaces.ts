



export interface Sprites {

	front_default: string,
	
}

export interface TypeData{

	name: string
}

export interface Types {

	type: TypeData,
}



export interface PokemonDetails{

	
	height: number,
	weight: number,
	name: string,
	sprites: Sprites,
	types: Array<Types>,
	
	
	

}

export interface Pok{

	pokemon: PokemonDetails
}

export interface PokemonProp{

	url: string,
	name: string,
	
	
}