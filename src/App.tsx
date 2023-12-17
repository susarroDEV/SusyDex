import { PokemonCard } from "./PokemonCard";

import "./App.css";

export function App() {
    return (
        <div className="container">
            <header>
                <img src="src\assets\Pokeball.png" alt="A Pokeball image" />
                <h1>SusyDex</h1>
            </header>
            <main>
                {Array.from({ length: 1018 }, (_, i) => (
                    <PokemonCard key={i} pokeIndex={i} />
                ))}
            </main>
        </div>
    );
}
