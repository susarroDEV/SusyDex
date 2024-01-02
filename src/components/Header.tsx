import React, { useContext } from 'react'
import { FilterContext } from '../context/filters'
import { type PokemonFilter } from '../types/PokemonFilter'
import { type Dispatch } from '../types/Dispatch'
import './Header.css'

export function Header () {
  const { state, dispatch } = useContext(FilterContext) as { state: PokemonFilter, dispatch: React.Dispatch<Dispatch> }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTER',
      name: event.target.name,
      value: event.target.value
    })
  }

  return (
        <header>
            <div className="pkh-logo">
                <img src="../../assets/LogoDex.png" alt="A Pokeball image" />
                <h1>SusyDex</h1>
            </div>
            <input
                name="name"
                className="pkh-search"
                type="text"
                placeholder="Search by name..."
                value={state.name}
                onChange={handleInputChange}
            />
        </header>
  )
}
