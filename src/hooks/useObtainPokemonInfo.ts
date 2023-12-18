import { useEffect, useState } from "react";

import { PokemonInfo } from "../types/PokemonInfo";

const END_POINT_POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";

export function useObtainPokemonInfo(pokeIndex: number): PokemonInfo[] {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo[]>([{
        name: "loading...",
        sprite: "",
        type1: "",
        type2: ""
    }]); 

    useEffect(() => {
        fetch(`${END_POINT_POKEMON_API + pokeIndex}`)
            .then(res => res.json())
            .then(data => {
                setPokemonInfo([{
                    name: data.name,
                    sprite: data.sprites.front_default,
                    type1: data.types[0].type.name,
                    type2: data.types.length > 1 ? data.types[1].type.name : ""
                }]);
            });
    }, []);

    return pokemonInfo;
}
