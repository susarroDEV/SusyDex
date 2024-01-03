import { useEffect, useState } from 'react'
import type { SingleVariationInfo } from '../types/SingleVariationInfo'
import { END_POINT_POKEMON_API } from '../utils/const'
import { useObtainSinglePokemonInfo } from './useObtainSinglePokemonInfo'

type Form = 'alolan' | 'galarian' | 'hisuian' | 'paldean' | 'mega' | 'megaX' | 'megaY' | 'gmax' | 'other'

export function useObtainSingleVariationInfo (pokeIndex: number | string) {
  const [variationData, setVariationData] = useState<SingleVariationInfo>({ forms: [] })
  const pokemonData = useObtainSinglePokemonInfo(pokeIndex)

  useEffect(() => {
    const fetchVariationInfo = async (form: Form, formName: string) => {
      if (pokemonData && 'forms' in pokemonData && form in pokemonData.forms) {
        try {
          const pokemonResponse = await fetch(`${END_POINT_POKEMON_API}${pokeIndex}-${formName}`)
          if (!pokemonResponse.ok) {
            throw new Error('Form not found')
          }
          const pokemonData = await pokemonResponse.json()
          setVariationData(prevState => ({
            forms: [
              ...prevState.forms,
              {
                id: pokemonData.id,
                name: pokemonData.name,
                sprite: pokemonData.sprites.front_default,
                shinySprite: pokemonData.sprites.front_shiny,
                type1: pokemonData.types[0].type.name,
                type2: pokemonData.types.length > 1 ? pokemonData.types[1].type.name : ''
              }
            ]
          }))
        } catch (error) {
          console.error(`Failed to fetch data for form ${formName}`)
        }
      }
    }

    const forms: Array<{ form: Form, formName: string }> = [
      { form: 'alolan', formName: 'alola' },
      { form: 'galarian', formName: 'galar' },
      { form: 'hisuian', formName: 'hisui' },
      { form: 'paldean', formName: 'paldea' },
      { form: 'mega', formName: 'mega' },
      { form: 'megaX', formName: 'mega-x' },
      { form: 'megaY', formName: 'mega-y' },
      { form: 'gmax', formName: 'gmax' },
      { form: 'other', formName: 'other' }
    ]

    forms.forEach(({ form, formName }) => {
      void fetchVariationInfo(form, formName)
    })
  }, [pokeIndex, pokemonData])

  return variationData
}
