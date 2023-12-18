import { PokemonCardList } from "./components/PokemonCardList";
import { Filters} from "./components/Filters";
import { Header } from "./components/Header";

import "./App.css";

export function App() {
    return (
        <div className="container">
            <Header/>
            <Filters/>
            <PokemonCardList/>
        </div>
    );
}
