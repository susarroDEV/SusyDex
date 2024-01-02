import { type ListPokemonInfo } from './ListPokemonInfo'

export type SinglePokemonInfo = ListPokemonInfo & {
  model3D: string
  shinyModel3D: string
  description: string
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}
