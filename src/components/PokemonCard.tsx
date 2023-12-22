import './PokemonCard.css';

import { useFilterPokemon } from '../hooks/useFilterPokemon';

export function PokemonCard() {
    const filteredPokemonList = useFilterPokemon();
    if (filteredPokemonList.length === 0) {
        return (
            <main>
                <h1>No Pokemon Found</h1>
            </main>
        );
    }
    else return (
        <main>
            {filteredPokemonList.map(pokemon => {
                return (
                    <div className={`pkc-container pkc-main-type-${pokemon.type1.toUpperCase()}`} key={pokemon.id}>
                        <img className='pkc-sprite' src={pokemon.sprite} alt={`The Sprite of ${pokemon.name}`} />
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