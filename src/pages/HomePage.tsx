import { FilterProvider } from "../context/filters";
import { Header } from "../components/Header";
import { Filters} from "../components/Filters";
import { Pokedex } from "../components/Pokedex";

import './HomePage.css';

export function HomePage() {
    return (
        <FilterProvider>
            <div className='container'>
                <Header/>
                <Filters/>
                <Pokedex/>
            </div>
        </FilterProvider>
    );
}
