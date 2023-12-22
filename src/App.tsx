import { PokemonCard } from "./components/PokemonCard";
import { Filters} from "./components/Filters";
import { Header } from "./components/Header";

import { FilterProvider } from "./context/filters";

import "./App.css";

export function App() {
    return (
        <FilterProvider>
            <div className='container'>
                <Header/>
                <Filters/>
                <PokemonCard />
            </div>
        </FilterProvider>
    );
}
