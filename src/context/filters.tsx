import { createContext, useState } from "react";
import { PokemonFilter } from "../types/PokemonFilter";

export const FilterContext = createContext<{filters: PokemonFilter, setFilters: React.Dispatch<React.SetStateAction<PokemonFilter>>} | undefined>({filters: {
    name: "",
    generation: "all",
    type: "all",
    eggGroup: "all",
    rarity: "all",
    height: 0,
    weight: 0
} , setFilters: () => {}});

export function FilterProvider  ({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] : [filters: PokemonFilter, setFilters: React.Dispatch<React.SetStateAction<PokemonFilter>>] = useState({
        name: "",
        generation: "all",
        type: "all",
        eggGroup: "all",
        rarity: "all",
        height: 0,
        weight: 0
    })

    return (
        <FilterContext.Provider value={{filters, setFilters} as {filters: PokemonFilter, setFilters: React.Dispatch<React.SetStateAction<PokemonFilter>>}}>
                {children}
        </FilterContext.Provider>
    )
}