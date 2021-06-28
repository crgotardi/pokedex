import styles from '../styles/Home.module.scss'

import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next'
// import Head from 'next/head'
//import Image from 'next/image'

import { api } from '../pages/api/api';

import { usePokemonDetails } from "../contexts/PokemonDetailContext";

import SearchBar from '../components/SearchBar';
import PokemonItem from '../components/PokemonItem';

type Pokemon = {
  name: string,
  url: string
}

type HomeProps = {
  pokemons: Pokemon[]
}

export default function Home({pokemons}: HomeProps) {
  const [pokemonList, setPokemonList] = useState(pokemons)
  const { searchPokemon } = usePokemonDetails();

  useEffect(() => {
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(searchPokemon));
    setPokemonList(pokemons)
  }, [searchPokemon])

  return (
    <div className={styles.homePage}>
      <img className={styles.pokedexLogo} 
            src="./type/pokeball.png" 
            alt="pokedex icon" 
            width="70"
      />
      <SearchBar/>
      <div className={styles.pokemonList}>
        { pokemonList.map((pokemon: Pokemon) => {
          return ( 
            <PokemonItem key={pokemon.name} name={pokemon.name} url={pokemon.url}/> 
          )
        }) }
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(`pokemon/?offset=0&limit=151`);
  const pokemons = data.results;

  return {
    props: {
      pokemons,
    },
    //revalidate: 1,
  };
};