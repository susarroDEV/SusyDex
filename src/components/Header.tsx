import React, { useContext } from 'react';
import { FilterContext } from '../context/filters';
import { PokemonFilter } from '../types/PokemonFilter';
import './Header.css';

export function Header() {
    const { filters, setFilters } = useContext(FilterContext) as { filters: PokemonFilter, setFilters: React.Dispatch<React.SetStateAction<PokemonFilter>> }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            name: event.target.value
        });
    };

    return (
        <header>
            <div className="pkh-logo">
                <img src="../assets/Pokeball.png" alt="A Pokeball image" />
                <h1>SusyDex</h1>
            </div>
            <input
                className="pkh-search"
                type="text"
                placeholder="Pikachu, Charmander ..."
                value={filters.name}
                onChange={handleInputChange}
            />
        </header>
    );
}