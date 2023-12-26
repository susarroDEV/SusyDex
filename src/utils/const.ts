import { PokemonFilter } from "../types/PokemonFilter";


export const INITIAL_FILTERS: PokemonFilter = {
    name: "",
    generation: "all",
    type: "all",
    eggGroup: "all",
    rarity: "all",
    minHeight: 0,
    maxHeight: 200,
    minWeight: 0,
    maxWeight: 9999,
    isShiny: false
}

export const POKEMON_COUNT = 1017;

export const END_POINT_POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";
export const END_POINT_POKEMON_SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species/";

export const EVENTS = {
    pushState: "pushstate",
    popState: "popstate"
}