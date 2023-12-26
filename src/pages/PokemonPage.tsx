import { useObtainSinglePokemonInfo } from "../hooks/useObtainSinglePokemonInfo";
import { RouteParams } from "../types/Routes";

export function PokemonPage({ routeParams }: { routeParams: RouteParams }) {
    const pokemonInfo = useObtainSinglePokemonInfo(routeParams.pokemonName); 
    if (!pokemonInfo) {
        return <p>Loading...</p>;
    }
    else {
        return (
            <section>
                <h1>{pokemonInfo.name} - #{pokemonInfo.id} - {pokemonInfo.generation}</h1>
                <img src={pokemonInfo.sprite} alt={`The Sprite of ${pokemonInfo.name}`} />
                <img src={pokemonInfo.shinySprite} alt={`The Shiny Sprite of ${pokemonInfo.name}`} />
                <img src={pokemonInfo.model3D} alt={`The Sprite of ${pokemonInfo.name}`} />
                <img src={pokemonInfo.shinyModel3D} alt={`The Shiny Sprite of ${pokemonInfo.name}`} />
                <h2> {pokemonInfo.type1} {pokemonInfo.type2}</h2>
                <h2> {pokemonInfo.eggGroup1} {pokemonInfo.eggGroup2}</h2>
                <p>Height: {pokemonInfo.height}</p>
                <p>Weight: {pokemonInfo.weight}</p>
                <h3>Stats</h3>
                <p>HP: {pokemonInfo.stats.hp}</p>
                <p>Attack: {pokemonInfo.stats.attack}</p>
                <p>Defense: {pokemonInfo.stats.defense}</p>
                <p>Special Attack: {pokemonInfo.stats.specialAttack}</p>
                <p>Special Defense: {pokemonInfo.stats.specialDefense}</p>
                <p>Speed: {pokemonInfo.stats.speed}</p>
                <p>{pokemonInfo.description}</p>
            </section>
        );
    }
}