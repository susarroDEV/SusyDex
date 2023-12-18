import { useEffect, useState } from "react";

export function Filters() {
    const [generationFilter, setGenerationFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.name === "generations") {
            setGenerationFilter(event.target.value);
        } else {
            setTypeFilter(event.target.value);
        }
        return ({generationFilter, typeFilter});
    };
    useEffect(() => {   
        console.log(generationFilter);
        console.log(typeFilter);
    }, [generationFilter, typeFilter]);

    return (
        <section>
            <label htmlFor="generations">Generations</label>
            <select name="generations" id="generations" onChange={handleChange}>
                <option value="all">All</option>
                <option value="gen1">Kanto</option>
                <option value="gen2">Johto</option>
                <option value="gen3">Hoenn</option>
                <option value="gen4">Sinnoh</option>
                <option value="gen5">Unova</option>
                <option value="gen6">Kalos</option>
                <option value="gen7">Alola</option>
                <option value="gen8">Galar</option>
                <option value="gen9">Paldea</option>
            </select>
            <label htmlFor="types">Types</label>
            <select name="types" id="types" onChange={handleChange}>
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
        </section>
    );
}