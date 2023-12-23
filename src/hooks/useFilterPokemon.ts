import { useContext } from "react";
import { useObtainPokemonInfo } from "./useObtainPokemonInfo";
import { PokemonInfo } from "../types/PokemonInfo";
import { FilterContext } from "../context/filters";

const POKEMON_COUNT = 1017;
const pokemonIndices = Array.from({length: POKEMON_COUNT}, (_, i) => i+1);

export function useFilterPokemon(): PokemonInfo[] {
    const filters = useContext(FilterContext);
    const rawPokemonList = useObtainPokemonInfo(pokemonIndices);

    const filterPokemonList = (pokemonList : PokemonInfo[]) => {
        return pokemonList.filter((pokemon) => {
            if (filters) {
                return (pokemon.name.toLowerCase().includes(filters.filters.name?.toLowerCase() || '') || filters.filters.name === "") &&
                    (pokemon.shinySprite && filters.filters.isShiny || filters.filters.isShiny === false) &&
                    (pokemon.type1 === filters.filters.type || pokemon.type2 === filters.filters.type || filters.filters.type === "all") &&
                    (pokemon.generation === filters.filters.generation || filters.filters.generation === "all") &&
                    (pokemon.eggGroup1 === filters.filters.eggGroup || pokemon.eggGroup2 === filters.filters.eggGroup || filters.filters.eggGroup === "all") &&
                    (pokemon.rarity === filters.filters.rarity || filters.filters.rarity === "all") &&
                    (pokemon.height>=filters.filters.minHeight && pokemon.height <= filters.filters.maxHeight) &&
                    (pokemon.weight>=filters.filters.minWeight && pokemon.weight <= filters.filters.maxWeight);
                }});
    }

    const filteredPokemonList = filterPokemonList(rawPokemonList);

    return filteredPokemonList;
}