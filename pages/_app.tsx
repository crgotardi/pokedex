import '../styles/globals.css'
import styles from '../styles/Home.module.scss';

import type { AppProps } from 'next/app'
import PokemonDetails from '../components/PokemonDetails'
import { PokemonDetailsContextProvider } from '../contexts/PokemonDetailContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <main>
        <PokemonDetailsContextProvider>
          <Component {...pageProps} />
          <PokemonDetails/>
        </PokemonDetailsContextProvider>
      </main>
    </div>
  )
}
export default MyApp
