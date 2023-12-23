import './PokemonCard.css';

import { FilterContext } from '../context/filters';
import { useFilterPokemon } from '../hooks/useFilterPokemon';
import { useContext } from 'react';

export function PokemonCard() {
    const isShiny = useContext(FilterContext)?.filters.isShiny as boolean;
    const filteredPokemonList = useFilterPokemon();



    if (filteredPokemonList.length === 0) {
        return (
            <main>
                <h1>No Pokemon Found</h1>
                <img src="../assets/EmptyPokeball.png" alt="An image of an empty pokeball" width={100}/>
            </main>
        );
    }
    else return (
        <main>
            {filteredPokemonList.map(pokemon => {
                return (
                    <div className={`pkc-container pkc-main-type-${pokemon.type1.toUpperCase()}`} key={pokemon.id}>
                        <strong className='pkc-number'>{`#${pokemon.id}`}</strong>
                        <img className='pkc-sprite' src={isShiny ? pokemon.shinySprite : pokemon.sprite} alt={`The Sprite of ${pokemon.name}`} />
                        <h1 className='pkc-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                        <div className ='pkc-types'>
                            <h2 className={`pkc-type-${pokemon.type1.toUpperCase()}`}>{pokemon.type1.toUpperCase()}</h2>
                            {pokemon.type2 && <h2 className={`pkc-type-${pokemon.type2?.toUpperCase()}`}>{pokemon.type2?.toUpperCase()}</h2>}
                        </div>
                    </div>
                );
            })}
        </main>
    );
}