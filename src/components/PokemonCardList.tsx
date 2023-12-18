import { PokemonCard } from "./PokemonCard"

export function PokemonCardList() {
    return (
        <main>
            {Array.from({ length: 1017 }, (_, i) => (
                <PokemonCard key={i + 1} pokeIndex={i + 1} />
            ))}
        </main>
    )
}