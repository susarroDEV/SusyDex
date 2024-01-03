import { useState, useEffect } from 'react'
import { END_POINT_POKEMON_API, END_POINT_POKEMON_SPECIES_API } from '../utils/const'
import { type SinglePokemonInfo } from '../types/SinglePokemonInfo'
import { type Description } from '../types/SinglePokemonProps'
import { type Variety } from '../types/ListPokemonProps'

export function useObtainSinglePokemonInfo (pokeIndex: number | string) {
  const [pokemonData, setPokemonData] = useState<SinglePokemonInfo>()

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const pokemonResponse = await fetch(`${END_POINT_POKEMON_API}${pokeIndex}`)
      const pokemonData = await pokemonResponse.json()
      const pokemonSpeciesResponse = await fetch(`${END_POINT_POKEMON_SPECIES_API}${pokemonData.id}`)
      const speciesData = await pokemonSpeciesResponse.json()
      if (pokemonData && speciesData) {
        const pokemonInfo: SinglePokemonInfo = {
          id: pokemonData.id,
          name: pokemonData.name,
          displayName: speciesData.names.find((name: { language: { name: string }, name: string }) => name.language.name === 'en')?.name,
          sprite: pokemonData.sprites.front_default,
          shinySprite: pokemonData.sprites.front_shiny,
          type1: pokemonData.types[0].type.name,
          type2: pokemonData.types.length > 1 ? pokemonData.types[1].type.name : '',
          height: pokemonData.height,
          weight: pokemonData.weight,
          generation: speciesData.generation?.name,
          eggGroup1: speciesData.egg_groups.length > 0 ? speciesData.egg_groups[0]?.name : 'undiscovered',
          eggGroup2: speciesData.egg_groups.length > 1 ? speciesData.egg_groups[1]?.name : '',
          rarity: speciesData.is_legendary ? 'legendary' : speciesData.is_mythical ? 'mythical' : speciesData.is_baby ? 'baby' : 'common',
          model3D: pokemonData.sprites.other.showdown.front_default,
          shinyModel3D: pokemonData.sprites.other.showdown.front_shiny,
          description: speciesData.flavor_text_entries.filter((entry: Description) => entry.language.name === 'en')[0]?.flavor_text,
          stats: {
            hp: pokemonData.stats[0]?.base_stat,
            attack: pokemonData.stats[1]?.base_stat,
            defense: pokemonData.stats[2]?.base_stat,
            specialAttack: pokemonData.stats[3]?.base_stat,
            specialDefense: pokemonData.stats[4]?.base_stat,
            speed: pokemonData.stats[5]?.base_stat
          },
          forms: {
            alolan: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('alola'))?.name,
            galarian: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('galar'))?.name,
            hisuian: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('hisui'))?.name,
            paldean: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('paldea'))?.name,
            mega: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('mega'))?.name,
            megaX: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('mega-x'))?.name,
            megaY: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('mega-y'))?.name,
            gmax: speciesData.varieties.find((variety: Variety) => variety.pokemon.name.includes('gmax'))?.name,
            other: pokemonData.forms.length > 1
          }
        }
        setPokemonData(pokemonInfo)
      }
    }
    void fetchPokemonInfo()
  }, [pokeIndex])
  return pokemonData
}
