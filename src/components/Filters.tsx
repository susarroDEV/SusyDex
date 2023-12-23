import { useContext, useId } from "react";

import { PokemonFilter } from "../types/PokemonFilter";

import { FilterContext } from "../context/filters";

import "./Filters.css";

export function Filters() {
    const {filters, setFilters} = useContext(FilterContext) as {filters: PokemonFilter, setFilters: React.Dispatch<React.SetStateAction<PokemonFilter>>}
    const [generationId, typesId, eggGroupId, rarityId, heightId, weightId] = [useId(), useId(), useId(), useId(), useId(), useId()]

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        })
    }

    const handleClear = () => {
            setFilters({
                name: "",
                generation: "all",
                type: "all",
                eggGroup: "all",
                rarity: "all",
                height: 200,
                weight: 9999,
                isShiny: false
            });

            const generationSelect = document.getElementById(generationId) as HTMLSelectElement;
            generationSelect.value = "all";

            const typeSelect = document.getElementById(typesId) as HTMLSelectElement;
            typeSelect.value = "all";

            const eggGroupSelect = document.getElementById(eggGroupId) as HTMLSelectElement;
            eggGroupSelect.value = "all";

            const raritySelect = document.getElementById(rarityId) as HTMLSelectElement;
            raritySelect.value = "all";
        }
    
    const handleShiny = () => {
        setFilters({
            ...filters,
            isShiny: !filters.isShiny
        })
    }

    return (
        <section className="pkf-container">
            <div className="pkf-select-container">
                <label htmlFor={generationId}>Generations</label>
                <select className="pkf-select pkf-generations" name="generation" id={generationId} onChange={handleChange}>
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
                <select className="pkf-select pkf-types" name="type" id={typesId} onChange={handleChange}>
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
                <select className="pkf-select pkf-egg-groups" name="eggGroup" id={eggGroupId} onChange={handleChange}>
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
                <select className="pkf-select pkf-rarity" name="rarity" id={rarityId} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="common">Common</option>
                    <option value="baby">Baby</option>
                    <option value="mythical">Mythical</option>
                    <option value="legendary">Legendary</option>                            
                </select>
            </div>
            <div className="pkf-range-container">
                <div className="pkf-height">
                    <label htmlFor={heightId}>Max. Height</label>
                    <input type="range" name="height" id={heightId} min={0} max={200} onChange={handleChange} />
                    <span> {`· ${filters.height*10} cm`} </span>
                </div>
                <div className="pkf-weight">
                    <label htmlFor={weightId}>Max. Weight</label>
                    <input  type="range" name="weight" id={weightId} min={0} max={9999} onChange={handleChange} />
                    <span> {`· ${filters.weight/10} kg`} </span>
                </div>
            </div>
            <div className="pkf-button-container">
                <button onClick={handleShiny}>
                    <img src="../assets/ShinyIcon.png" alt="An image representing Shiny Icon" style={filters.isShiny? {backgroundColor: "#1d1d1d ", filter: "invert(0)"} :{backgroundColor: "transparent"} } />
                </button>
                <button onClick={handleClear}>
                    <img src="../assets/ClearFilter.png" alt="An image of clearing filters" />
                </button>
            </div>
        </section>
    );
}