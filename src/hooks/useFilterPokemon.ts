import { useContext } from "react";
import { useObtainPokemonInfo } from "./useObtainListPokemonInfo";
import { ListPokemonInfo } from "../types/ListPokemonInfo";
import { FilterContext } from "../context/filters";
import { PokemonFilter } from "../types/PokemonFilter";
import { POKEMON_COUNT } from "../utils/const";

const pokemonIndices = Array.from({length: POKEMON_COUNT}, (_, i) => i+1);

export function useFilterPokemon(): ListPokemonInfo[] {
    const { state } = useContext(FilterContext) as { state: PokemonFilter }
    const rawPokemonList = useObtainPokemonInfo(pokemonIndices);

    const filterPokemonList = (pokemonList : ListPokemonInfo[]) => {
        return pokemonList.filter((pokemon) => {
            return (pokemon.name.toLowerCase().includes(state.name?.toLowerCase() || '') || state.name === "") &&
                (pokemon.shinySprite && state.isShiny || state.isShiny === false) &&
                (pokemon.type1 === state.type || pokemon.type2 === state.type || state.type === "all") &&
                (pokemon.generation === state.generation || state.generation === "all") &&
                (pokemon.eggGroup1 === state.eggGroup || pokemon.eggGroup2 === state.eggGroup || state.eggGroup === "all") &&
                (pokemon.rarity === state.rarity || state.rarity === "all") &&
                (pokemon.height>=state.minHeight && pokemon.height <= state.maxHeight) &&
                (pokemon.weight>=state.minWeight && pokemon.weight <= state.maxWeight);
        });
    }

    const filteredPokemonList = filterPokemonList(rawPokemonList);

    return filteredPokemonList;
}