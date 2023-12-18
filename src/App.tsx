import { PokemonCard } from "./components/PokemonCard";
import { Filters} from "./components/Filters";
import { Header } from "./components/Header";

import "./App.css";

export function App() {
    return (
        <div className="container">
            <Header />
            <Filters/>
            <main>
                {Array.from({ length: 1018 }, (_, i) => (
                    <PokemonCard key={i} pokeIndex={i} />
                ))}
            </main>
        </div>
    );
}
