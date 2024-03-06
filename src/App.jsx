import React, { useState, useEffect } from "react";
import { getPokemon } from "./api/pokemon";
import "./App.css";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (pokemonName) {
      getPokemon(pokemonName).then((resp) => {
        setPokemonData(resp.data);
      });
    }
  }, [pokemonName]);

  const handleSelectChange = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <>
      <h1>My Pokemon</h1>
      <select value={pokemonName} onChange={handleSelectChange}>
        <option value="">Selecione um Pokémon</option>
        <option value="ditto">Ditto</option>
        <option value="pikachu">Pikachu</option>
        <option value="charmander">Charmander</option>
      </select>
      {pokemonData && (
        <div className="card">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Nome: {pokemonData.name}</p>
          <p>Habilidades:</p>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <p>Tipos:</p>
          <ul>
            {pokemonData.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default App;
