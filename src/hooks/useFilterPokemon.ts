import { useContext } from 'react'
import { useObtainPokemonInfo } from './useObtainListPokemonInfo'
import { type ListPokemonInfo } from '../types/ListPokemonInfo'
import { FilterContext } from '../context/filters'
import { type PokemonFilter } from '../types/PokemonFilter'
import { POKEMON_COUNT } from '../utils/const'

const pokemonIndices = Array.from({ length: POKEMON_COUNT }, (_, i) => i + 1)

export function useFilterPokemon (): ListPokemonInfo[] {
  const { state } = useContext(FilterContext) as { state: PokemonFilter }
  const rawPokemonList = useObtainPokemonInfo(pokemonIndices)

  const filterPokemonList = (pokemonList: ListPokemonInfo[]): ListPokemonInfo[] => {
    return pokemonList.filter((pokemon) => {
      return (pokemon.displayName.toLowerCase().includes(state.name?.toLowerCase() || '') || state.name === '') &&
                ((pokemon.shinySprite && state.isShiny) || !state.isShiny) &&
                (pokemon.type1 === state.type || pokemon.type2 === state.type || state.type === 'all') &&
                (pokemon.generation === state.generation || state.generation === 'all') &&
                (pokemon.eggGroup1 === state.eggGroup || pokemon.eggGroup2 === state.eggGroup || state.eggGroup === 'all') &&
                (pokemon.rarity === state.rarity || state.rarity === 'all') &&
                ((pokemon.forms.alolan && state.form === 'alolan') ||
                (pokemon.forms.galarian && state.form === 'galarian') ||
                (pokemon.forms.hisuian && state.form === 'hisuian') ||
                (pokemon.forms.paldean && state.form === 'paldean') ||
                (pokemon.forms.mega && state.form === 'mega') ||
                (pokemon.forms.gmax && state.form === 'gmax') ||
                (pokemon.forms.other && state.form === 'other') ||
                (state.form === 'none' && !pokemon.forms.alolan && !pokemon.forms.galarian && !pokemon.forms.hisuian && !pokemon.forms.paldean && !pokemon.forms.mega && !pokemon.forms.gmax && !pokemon.forms.other) ||
                state.form === 'all') &&
                (pokemon.height >= state.minHeight && pokemon.height <= state.maxHeight) &&
                (pokemon.weight >= state.minWeight && pokemon.weight <= state.maxWeight)
    })
  }
  return filterPokemonList(rawPokemonList)
}
