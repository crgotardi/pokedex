// import styles from '../styles/Home.module.css'

import { GetStaticProps } from 'next'
// import Head from 'next/head'
//import Image from 'next/image'

import { api } from '../pages/api/api';

type Pokemon = {
  name: string,
  url: string
}

type HomeProps = {
  pokemonList: Pokemon[]
}

export default function Home(pokemons: HomeProps) {
  console.log(pokemons, 'a')
  return (
    <div>
      <h1>A</h1>
    </div>
  )
}

export const getStaticProps:GetStaticProps = async() => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { data } = await api.get(`pokemon/?offset=0&limit=151`);

  // Pass post data to the page via props
  return { 
    props: { 
      data
    },
    revalidate: 1
  }
}