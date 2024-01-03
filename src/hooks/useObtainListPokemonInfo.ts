import { useEffect, useState, useRef } from 'react'
import { type ListPokemonInfo } from '../types/ListPokemonInfo'
import { END_POINT_POKEMON_API, END_POINT_POKEMON_SPECIES_API } from '../utils/const'
import { type Variety } from '../types/ListPokemonProps'

export function useObtainPokemonInfo (pokeIndices: number[]): ListPokemonInfo[] {
  const [pokemonData, setPokemonData] = useState<ListPokemonInfo[]>([])
  const currentIndexRef = useRef(0)
  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const batchSize = 100
      for (let i = currentIndexRef.current; i < pokeIndices.length; i += batchSize) {
        const batchIndices = pokeIndices.slice(i, i + batchSize)
        const batchData = await Promise.all(
          batchIndices.map(async (index: number) => {
            const pokemonResponse = await fetch(`${END_POINT_POKEMON_API}${index}`)
            const pokemonData = await pokemonResponse.json()
            const pokemonSpeciesResponse = await fetch(`${END_POINT_POKEMON_SPECIES_API}${index}`)
            const speciesData = await pokemonSpeciesResponse.json()
            const pokemonInfo: ListPokemonInfo = {
              id: pokemonData.id,
              name: pokemonData.name,
              displayName: speciesData.names.find((name: { language: { name: string }, name: string }) => name.language.name === 'en')?.name,
              sprite: pokemonData.sprites.front_default,
              shinySprite: pokemonData.sprites.front_shiny,
              type1: pokemonData.types[0].type.name,
              type2: pokemonData.types.length > 1 ? pokemonData.types[1].type.name : '',
              height: pokemonData.height,
              weight: pokemonData.weight,
              generation: speciesData.generation.name,
              eggGroup1: speciesData.egg_groups.length > 0 ? speciesData.egg_groups[0].name : 'undiscovered',
              eggGroup2: speciesData.egg_groups.length > 1 ? speciesData.egg_groups[1].name : '',
              rarity: speciesData.is_legendary ? 'legendary' : speciesData.is_mythical ? 'mythical' : speciesData.is_baby ? 'baby' : 'common',
              forms: {
                alolan: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('alola')),
                galarian: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('galar')),
                hisuian: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('hisui')),
                paldean: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('paldea')),
                mega: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('mega')),
                megaX: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('mega-x')),
                megaY: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('mega-y')),
                gmax: speciesData.varieties.some((variety: Variety) => variety.pokemon.name.includes('gmax')),
                other: pokemonData.forms.length > 1 || (speciesData.varieties.length > 1 && (speciesData.generation.name === 'generation-viii' || speciesData.generation.name === 'generation-ix'))
              }
            }
            return pokemonInfo
          })
        )
        setPokemonData(prevData => [...prevData, ...batchData])
        currentIndexRef.current = i + batchSize
      }
    }
    void fetchPokemonInfo()
  }, [pokeIndices])

  return pokemonData
}
