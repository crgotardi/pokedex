import styles from './styles.module.scss';

import React from 'react'

import { usePokemonDetails } from "../../contexts/PokemonDetailContext";

export default function SearchBar() {
  const { setPokemonSearch } = usePokemonDetails();

  function filterPokemon(event: any) {
    setPokemonSearch(event.target.value);
  }

  return (
    <>
      <form className={styles.form}>
        <input type="text" name="search" placeholder="Busque um pokémon..." onInput={(event) => filterPokemon(event)}></input>
      </form>
    </>
  )
}
