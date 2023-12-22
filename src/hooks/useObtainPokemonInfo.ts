import { useEffect, useState, useRef } from "react";
import { PokemonInfo } from "../types/PokemonInfo";

const END_POINT_POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";
const END_POINT_POKEMON_SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species/";

export function useObtainPokemonInfo(pokeIndices: number[]): PokemonInfo[] {
    const [pokemonData, setPokemonData] = useState<PokemonInfo[]>([]);
    const currentIndexRef = useRef(0);

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            const batchSize = 100; 
            for (let i = currentIndexRef.current; i < pokeIndices.length; i += batchSize) {
                const batchIndices = pokeIndices.slice(i, i + batchSize);
                const batchData = await Promise.all(
                    batchIndices.map(async (index: number) => {
                        const pokemonResponse = await fetch(`${END_POINT_POKEMON_API}${index}`);
                        const pokemonData = await pokemonResponse.json();
                        const pokemonSpeciesResponse = await fetch(`${END_POINT_POKEMON_SPECIES_API}${index}`);
                        const speciesData = await pokemonSpeciesResponse.json();
                        const pokemonInfo: PokemonInfo = {
                            id: pokemonData.id,
                            name: pokemonData.name,
                            sprite: pokemonData.sprites.front_default,
                            type1: pokemonData.types[0].type.name,
                            type2: pokemonData.types.length > 1 ? pokemonData.types[1].type.name : "",
                            height: pokemonData.height,
                            weight: pokemonData.weight,
                            generation: speciesData.generation.name,
                            eggGroup1: speciesData.egg_groups.length > 0 ? speciesData.egg_groups[0].name : "undiscovered",
                            eggGroup2: speciesData.egg_groups.length > 1 ? speciesData.egg_groups[1].name : "",
                            rarity: speciesData.is_legendary ? "legendary" : speciesData.is_mythical ? "mythical" : speciesData.is_baby ? "baby" : "common",
                        };
                        return pokemonInfo;
                    })
                );
                setPokemonData(prevData => [...prevData, ...batchData]);
                currentIndexRef.current = i + batchSize;
            }
        };
        fetchPokemonInfo();
    }, [pokeIndices]);

    return pokemonData;
}