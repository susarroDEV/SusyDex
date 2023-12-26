import { useState, useEffect } from "react";
import { END_POINT_POKEMON_API, END_POINT_POKEMON_SPECIES_API } from "../utils/const";
import { SinglePokemonInfo } from "../types/SinglePokemonInfo";
import { Ability } from "../types/SinglePokemonProps";

export function useObtainSinglePokemonInfo (pokeIndex: number | string) {
    const [pokemonData, setPokemonData] = useState<SinglePokemonInfo>()

    useEffect(() => {
        const fetchPokemonInfo = async () => {
            const pokemonResponse = await fetch(`${END_POINT_POKEMON_API}${pokeIndex}`);
            const pokemonData = await pokemonResponse.json();
            const pokemonSpeciesResponse = await fetch(`${END_POINT_POKEMON_SPECIES_API}${pokeIndex}`);
            const speciesData = await pokemonSpeciesResponse.json();
            if (pokemonData && speciesData) {
                const pokemonInfo: SinglePokemonInfo = {
                    id : pokemonData.id,
                    name : pokemonData.name,
                    sprite : pokemonData.sprites.front_default, 
                    shinySprite : pokemonData.sprites.front_shiny, 
                    type1: pokemonData.types[0].type.name,
                    type2: pokemonData.types.length > 1 ? pokemonData.types[1].type.name : "",
                    height : pokemonData.height,
                    weight : pokemonData.weight,
                    generation : speciesData.generation?.name,
                    eggGroup1 : speciesData.egg_groups.length > 0 ? speciesData.egg_groups[0]?.name : "undiscovered",
                    eggGroup2 : speciesData.egg_groups.length > 1 ? speciesData.egg_groups[1]?.name : "",
                    rarity : speciesData.is_legendary ? "legendary" : speciesData.is_mythical ? "mythical" : speciesData.is_baby ? "baby" : "common",
                    model3D : pokemonData.sprites.other.showdown.front_default, 
                    shinyModel3D :pokemonData.sprites.other.showdown.front_shiny,
                    description : speciesData.flavor_text_entries[0]?.flavor_text,
                    stats : {
                        hp : pokemonData.stats[0]?.base_stat,
                        attack : pokemonData.stats[1]?.base_stat,
                        defense : pokemonData.stats[2]?.base_stat,
                        specialAttack : pokemonData.stats[3]?.base_stat,
                        specialDefense : pokemonData.stats[4]?.base_stat,
                        speed : pokemonData.stats[5]?.base_stat
                    },
                    abilities : pokemonData.abilities.map((ability: Ability) => ability.ability.name),
                }
                setPokemonData(pokemonInfo);
            }
        }
        fetchPokemonInfo();
    }, [pokeIndex]);

    return pokemonData;
}