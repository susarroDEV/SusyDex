import { useEffect, useState } from "react";

import { PokemonInfo } from "../types/PokemonInfo";

const END_POINT_POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";




export function useObtainPokemonInfo(pokeIndex : number) : PokemonInfo[] {
    const [pokemonName, setPokemonName] = useState("loading...");
    const [pokemonSprite, setPokemonSprite] = useState("");
    const [pokemonType1, setPokemonType1] = useState("");
    const [pokemonType2, setPokemonType2] = useState("");

    useEffect(() => {
        fetch(`${END_POINT_POKEMON_API + pokeIndex}`)
            .then(res => res.json())
            .then(data => {
                setPokemonName(data.name);
                setPokemonSprite(data.sprites.front_default);
                setPokemonType1(data.types[0].type.name);
                if (data.types.length > 1) {
                    setPokemonType2(data.types[1].type.name);
                }
            });

    }, []);
    if (pokemonType2 !== "") {
        return [{ name: pokemonName, sprite: pokemonSprite, type1: pokemonType1, type2: pokemonType2 } as PokemonInfo];
    } else {
        return [{ name: pokemonName, sprite: pokemonSprite, type1: pokemonType1 } as PokemonInfo];
    }
} 
