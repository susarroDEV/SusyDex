import { HomePage } from "./pages/HomePage";
import { PokemonPage } from "./pages/PokemonPage";
import  Page404  from "./pages/Page404";

import { Router } from "./components/Router";

import { FilterProvider } from "./context/filters";
import { Route } from "./components/Route";

export function App() {
    return (
        <FilterProvider>
            <Router defaultComponent={Page404}>
                <Route path="/" Component={HomePage} />
                <Route path="/pokemon/:pokemonName" Component={PokemonPage} />
            </Router> 
        </FilterProvider>
    );
}