import styles from './styles.module.scss';

import React, { useEffect } from 'react'

import { usePokemonDetails } from "../../contexts/PokemonDetailContext";

type Pokemon = {
  name: string;
  url: string;
};

export default function PokemonItem({name, url}: Pokemon) {
  const { setPokemonDetailsUrl } = usePokemonDetails();

  let pokemonId = parseInt(url.split('/')[6]);

  name = name.charAt(0).toUpperCase() + name.slice(1, name.length);

  return (
    <div className={styles.pokemonItem} role="button" onClick={() => {setPokemonDetailsUrl(url)}}>
      <div className={styles.pokemonImage}>
        {
          pokemonId ? (
            <img
              src={`./sprites/pokemon/official-artwork/${pokemonId}.png`}
              alt="Pokemon Image"
              width="50"
            />
          ) : ''
        }
      </div>
      <div className={styles.pokemonInfo}>
        <h2>{name}</h2>
        <div className={styles.pokemonType}>
          <img src="./sprites/type/icon-grass-type.png" alt="Pokemon type" />
          <img src="./sprites/type/icon-poison-type.png" alt="Pokemon type" />
        </div>
      </div>
    </div>
  );
}
