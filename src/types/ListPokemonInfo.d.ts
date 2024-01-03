export interface ListPokemonInfo {
  id: number
  name: string
  displayName: string
  sprite: string
  shinySprite: string
  type1: string
  type2?: string
  height: number
  weight: number
  generation: string
  eggGroup1: string
  eggGroup2: string
  rarity: string
  forms: {
    alolan: boolean
    galarian: boolean
    hisuian: boolean
    paldean: boolean
    mega: boolean
    megaX: boolean
    megaY: boolean
    gmax: boolean
    other: boolean
  }
}
