import { useContext, useId } from "react";
import { PokemonFilter } from "../types/PokemonFilter";
import { FilterContext } from "../context/filters";
import { Dispatch } from "../types/Dispatch";
import "./Filters.css";

export function Filters() {
    const { state, dispatch } = useContext(FilterContext) as { state: PokemonFilter, dispatch: React.Dispatch<Dispatch> };
    const [generationId, typesId, eggGroupId, rarityId, heightId, minHeightId, maxHeightId, weightId, minWeightId, maxWeightId] = [useId(), useId(), useId(), useId(), useId(), useId(), useId(), useId(), useId(), useId(), useId()];

    const controlSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'SLIDER_CONTROL',
            name: event.target.name,
            value: event.target.value
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({
            type: 'SET_FILTER',
            name: event.target.name,
            value: event.target.value
        });
    };

    const handleShiny = () => {
        dispatch({
            type: 'SET_SHINY'
        });
    };

    const handleClear = () => {
        dispatch({
            type: 'CLEAR_FILTERS'
        });
    };

    return (
        <section className="pkf-container">
            <div className="pkf-select-container">
                <label htmlFor={generationId}>Generations</label>
                <select className="pkf-select pkf-generations" value={state.generation} name="generation" id={generationId} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="generation-i">Kanto</option>
                    <option value="generation-ii">Johto</option>
                    <option value="generation-iii">Hoenn</option>
                    <option value="generation-iv">Sinnoh</option>
                    <option value="generation-v">Unova</option>
                    <option value="generation-vi">Kalos</option>
                    <option value="generation-vii">Alola</option>
                    <option value="generation-viii">Galar</option>
                    <option value="generation-ix">Paldea</option>
                </select>
            </div>
            <div className="pkf-select-container">
                <label htmlFor={typesId}>Types</label>
                <select className="pkf-select pkf-types" value={state.type} name="type" id={typesId} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="bug">Bug</option>
                    <option value="dark">Dark</option>
                    <option value="dragon">Dragon</option>
                    <option value="electric">Electric</option>
                    <option value="fairy">Fairy</option>
                    <option value="fighting">Fighting</option>
                    <option value="fire">Fire</option>
                    <option value="flying">Flying</option>
                    <option value="ghost">Ghost</option>
                    <option value="grass">Grass</option>
                    <option value="ground">Ground</option>
                    <option value="ice">Ice</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Poison</option>
                    <option value="psychic">Psychic</option>
                    <option value="rock">Rock</option>
                    <option value="steel">Steel</option>
                    <option value="water">Water</option>
                </select>
            </div>
            <div className="pkf-select-container">
                <label htmlFor={eggGroupId}>Egg Group</label>
                <select className="pkf-select pkf-egg-groups" value={state.eggGroup} name="eggGroup" id={eggGroupId} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="monster">Monster</option>
                    <option value="water1">Water 1</option>
                    <option value="bug">Bug</option>
                    <option value="flying">Flying</option>
                    <option value="ground">Ground</option>
                    <option value="fairy">Fairy</option>
                    <option value="plant">Plant</option>
                    <option value="humanshape">Human Shape</option>
                    <option value="water3">Water 3</option>
                    <option value="mineral">Mineral</option>
                    <option value="indeterminate">Indeterminate</option>
                    <option value="water2">Water 2</option>
                    <option value="ditto">Ditto</option>
                    <option value="dragon">Dragon</option>
                    <option value="no-eggs">No Eggs</option>
                    <option value="undiscovered">Undiscovered</option>                                
                </select>

            </div>
            <div className="pkf-select-container">
                <label htmlFor={rarityId}>Rarity</label>
                <select className="pkf-select pkf-rarity" value={state.rarity} name="rarity" id={rarityId} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="common">Common</option>
                    <option value="baby">Baby</option>
                    <option value="mythical">Mythical</option>
                    <option value="legendary">Legendary</option>                            
                </select>
            </div>
                <div className="pkf-height">
                    <label htmlFor={heightId}>Height</label>
                    <div id={heightId} className="pkf-range-container-height">
                        <input className="pkf-range-max-height" type="range" name="maxHeight" value={state.maxHeight} id={minHeightId} min={0} max={200} onChange={controlSlider} />
                        <input className="pkf-range-min-height" type="range" name="minHeight" value={state.minHeight} id={maxHeightId} min={0} max={200} onChange={controlSlider} />
                    </div>
                    <span>{`${state.minHeight/10}  -  ${state.maxHeight/10}m`}</span>
                    
                </div>
                <div className="pkf-weight">
                    <label htmlFor={weightId}>Weight</label>
                    <div id={weightId} className="pkf-range-container-weight">
                        <input className="pkf-range-min-weight" type="range" name="minWeight" value={state.minWeight} id={maxWeightId} min={0} max={9999} onChange={controlSlider} />
                        <input className="pkf-range-max-weight" type="range" name="maxWeight" value={state.maxWeight} id={minWeightId} min={0} max={9999} onChange={controlSlider} />
                    </div>
                    <span>{`${state.minWeight/10}  -  ${state.maxWeight/10}kg`}</span>
                </div>
            <div className="pkf-button-container">
                <button onClick={handleShiny}>
                    <img src="../assets/ShinyIcon.png" alt="An image representing Shiny Icon" style={state.isShiny? {backgroundColor: "#1d1d1d ", filter: "invert(0)"} :{backgroundColor: "transparent"} } />
                </button>
                <button onClick={handleClear}>
                    <img src="../assets/ClearFilter.png" alt="An image of clearing filters" />
                </button>
            </div>
        </section>
    );
}