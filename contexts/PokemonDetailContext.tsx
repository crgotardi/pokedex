import { createContext, ReactNode, useContext, useState } from 'react';

type PokemonDetailsData = {
  url: string;
  setPokemonDetailsUrl: (url: string) => void;
  searchPokemon: string;
  setPokemonSearch: (search: string) => void;
  zIndex: number,
  setZIndexComponent: (zIndex: number) => void;
};

type PokemonDetailsContextProviderProps = {
  children: ReactNode;
};

type Pokemon = {
  name: string;
  url: string;
};

type Pokemons = {
  pokemons: Pokemon[];
};

export const PokemonDetailsContext = createContext({} as PokemonDetailsData);

export function PokemonDetailsContextProvider({ children }: PokemonDetailsContextProviderProps) {
  const [url, setUrl] = useState('');
  const [searchPokemon, setSearchPokemon] = useState('');
  const [zIndex, setZIndex] = useState(0);

  function setPokemonDetailsUrl(url: string) {
    setUrl(url)
  }

  function setPokemonSearch(search: string) {
    setSearchPokemon(search);
  }

  function setZIndexComponent(zindex: number) {
    setZIndex(zindex)
  }

  return (
    <PokemonDetailsContext.Provider value={{
      url,
      setPokemonDetailsUrl,
      searchPokemon,
      setPokemonSearch,
      zIndex,
      setZIndexComponent
    }}>
      {children}
    </PokemonDetailsContext.Provider>
  )
}

export const usePokemonDetails = () => {
  return useContext(PokemonDetailsContext);
};
