import styles from './styles.module.scss';

import React, { useEffect } from 'react'

import { usePokemonDetails } from "../../contexts/PokemonDetailContext";

type Pokemon = {
  name: string;
  url: string;
};

export default function PokemonItem({name, url}: Pokemon) {
  const { setPokemonDetailsUrl, setZIndexComponent } = usePokemonDetails();

  let pokemonId = parseInt(url.split('/')[6]);

  name = name.charAt(0).toUpperCase() + name.slice(1, name.length);

  function selectPokemon(url: string) {
    setPokemonDetailsUrl(url);
    setZIndexComponent(20);
  }

  return (
    <div className={styles.pokemonItem} role="button" onClick={() => {selectPokemon(url)}}>
      <div className={styles.pokemonImage}>
        {
          pokemonId ? (
            <img
              src={`./official-artwork/${pokemonId}.png`}
              alt="Pokemon Image"
              width="50"
            />
          ) : ''
        }
      </div>
      <div className={styles.pokemonInfo}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
