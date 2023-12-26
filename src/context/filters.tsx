import { createContext, useReducer } from "react";
import { PokemonFilter } from "../types/PokemonFilter";
import { FilterAction } from "../types/FilterAction";
import { INITIAL_FILTERS } from "../utils/const";

const reducer = (state: PokemonFilter, action: FilterAction): PokemonFilter => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                [action.name]: action.value
            };
        case 'SET_SHINY':
            return {
                ...state,
                isShiny: !state.isShiny
            };
        case 'CLEAR_FILTERS':
            return INITIAL_FILTERS;
        case 'SLIDER_CONTROL':
            if (action.name === "minHeight" && Number(action.value) > state.maxHeight) {
                return {
                    ...state,
                    minHeight: state.maxHeight
                }
            }
            if (action.name === "maxHeight" && Number(action.value) < state.minHeight) {
                return {
                    ...state,
                    maxHeight: state.minHeight
                }
            }
            if (action.name === "minWeight" && Number(action.value) > state.maxWeight) {
                return {
                    ...state,
                    minWeight: state.maxWeight
                }
            }
            if (action.name === "maxWeight" && Number(action.value) < state.minWeight) {
                return {
                    ...state,
                    maxWeight: state.minWeight
                }
            }
            return {
                ...state,
                [action.name]: action.value
            };
    }
}

export const FilterContext = createContext<{state: PokemonFilter, dispatch: React.Dispatch<FilterAction>} | undefined>({state: INITIAL_FILTERS , dispatch: () => {}});

export function FilterProvider  ({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_FILTERS);

    return (
        <FilterContext.Provider value={{state, dispatch}}>
            {children}
        </FilterContext.Provider>
    )
}