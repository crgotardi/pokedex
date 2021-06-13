import { createContext, ReactNode, useContext, useState } from 'react';

type PokemonDetailsData = {
  url: string;
  setPokemonDetailsUrl: (url: string) => void;
};

type PokemonDetailsContextProviderProps = {
  children: ReactNode;
};


export const PokemonDetailsContext = createContext({} as PokemonDetailsData);

export function PokemonDetailsContextProvider({ children }: PokemonDetailsContextProviderProps) {
  const [url, setUrl] = useState('');

  function setPokemonDetailsUrl(url: string) {
    setUrl(url)
  }

  return (
    <PokemonDetailsContext.Provider value={{
      url,
      setPokemonDetailsUrl
    }}>
      {children}
    </PokemonDetailsContext.Provider>
  )
}

export const usePokemonDetails = () => {
  return useContext(PokemonDetailsContext);
};
