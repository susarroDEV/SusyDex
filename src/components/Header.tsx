import React, { useContext } from 'react';
import { FilterContext } from '../context/filters';
import { PokemonFilter } from '../types/PokemonFilter';
import { Dispatch } from '../types/Dispatch';
import './Header.css';

export function Header() {
    const { state, dispatch } = useContext(FilterContext) as { state: PokemonFilter, dispatch: React.Dispatch<Dispatch> }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'SET_FILTER',
            name: event.target.name,
            value: event.target.value
        });
    };

    return (
        <header>
            <div className="pkh-logo">
                <img src="../assets/Pokeball.png" alt="A Pokeball image" />
                <h1>SusyDex</h1>
            </div>
            <input
                name="name"
                className="pkh-search"
                type="text"
                placeholder="Pikachu, Charmander ..."
                value={state.name}
                onChange={handleInputChange}
            />
        </header>
    );
}