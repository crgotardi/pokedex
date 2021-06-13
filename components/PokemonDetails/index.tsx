import styles from './styles.module.scss';

import { useEffect, useState } from 'react';

import { api } from '../../pages/api/api';
import { usePokemonDetails } from '../../contexts/PokemonDetailContext';

type PokemonTypesData = {
  slot: string,
  type: {
    name: string,
    url: string
  }
}

type PokemonStatsData = {
  base_stat: number,
  stat: {
    name: string,
  }
}

type PokemonEvolutionChainData = {
  evolutionDetail: PokemonEvolutionDetailsData[],
  evolvesTo: PokemonEvolutionChainData[],
  isBaby: boolean,
  species: {
    name: string,
    url: string
  }
};

type PokemonEvolutionDetailsData = {
  gender: string;
  held_item: string;
  item: string;
  knownMove: string;
  knownMoveType: string;
  location: string;
  minAffection: string;
  minBeauty: string;
  minHappiness: string;
  minLevel: 16;
  needsOverworldRain: boolean;
  partySpecies: string;
  partyType: string;
  relativePhysicalStats: string;
  timeOfDay: string;
  tradeSpecies: string;
  trigger: {
    name: string,
    url: string
  }
};

type PokemonDetailsData = {
  id: number,
  name: string,
  description: string,
  types: PokemonTypesData[],
  stats: PokemonStatsData[],
  evolution: PokemonEvolutionChainData
}

function PokemonDetails() {
  const { url } = usePokemonDetails();

  const [pokemonDetailsData, setPokemonDetailsData] = useState({})

  useEffect(() => {
    if (url) {
      let pokemonDetails: any = {}
      api.get(url)
      .then(({ data }) => {
        pokemonDetails = {
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1, data.name.length),
          types: data.types,
          stats: data.stats,
        }
        api
          .get(data.species.url)
          .then(({ data }) => {
            pokemonDetails = {
              ...pokemonDetails,
              description: data.flavor_text_entries[0].flavor_text.replace("", ' '),
            };
            api
              .get(data.evolution_chain.url)
              .then(({ data }) => {
                console.log(data)
                let evolution = {};
                evolution = {
                  chain: data.chain.species,
                  evolution1: { 
                    chain: data.chain?.evolves_to[0].species,
                    trigger: 'TO-DO'
                  },
                  evolution2: data.chain?.evolves_to[0]?.evolves_to[0].species,
                };

                pokemonDetails = {
                  ...pokemonDetails,
                  evolution
                };
                setPokemonDetailsData(pokemonDetails as PokemonDetailsData);
                console.log(pokemonDetails)
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [url])

  return (
    <section className={styles.pokemonDetails}>
      <div className={styles.pokemonHeader}>
        <div className={styles.pokemonTitle}>
          <h1>{pokemonDetailsData?.name}</h1>
          <div className={styles.pokemonType}>
            <img src="./sprites/type/icon-grass-type.png" alt="Pokemon type" />
            <img src="./sprites/type/icon-poison-type.png" alt="Pokemon type" />
          </div>
        </div>
        <div className={styles.pokemonImage}>
          {pokemonDetailsData.id ? (
            <img
              src={`./sprites/pokemon/official-artwork/${pokemonDetailsData.id}.png`}
              alt="Pokemon Image"
              width="35%"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.pokemonBody}>
        <p className={styles.chip}>Info</p>
        <div className={styles.pokemonInfo}>
          <p>{pokemonDetailsData?.description}</p>
          <div className={styles.pokemonStatusList}>
            {pokemonDetailsData?.stats?.map((stat: any) => {
              return (
                <div key={stat.stat.name} className={styles.pokemonStatusItem}>
                  <p>{stat.stat.name}</p>
                  <div
                    className={styles.pokemonStatusBar}
                    style={{ width: stat.base_stat + "%" }}
                  >
                    <p> </p>
                  </div>
                  <p>{stat.base_stat}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.pokemonEvolutionChain}>
          <div>
            <img
              src={`./sprites/pokemon/official-artwork/${pokemonDetailsData?.id}.png`}
              alt="Pokemon Image"
              width="30%"
            />
            <p>
              <strong>{pokemonDetailsData?.name}</strong>
            </p>
            <p>&nbsp;</p>
          </div>
          {pokemonDetailsData.evolution?.chain?.evolves_to?.map((evolve) => {
            return (
              <div>
                <img
                  src={`./sprites/pokemon/official-artwork/2.png`}
                  alt="Pokemon Image"
                  width="30%"
                />
                <p>
                  <strong>
                    {
                      evolve.species?.url?.split("/")[
                        evolve.species?.url?.split("/").length
                      ]
                    }
                  </strong>
                </p>
                <p>Lv 16</p>
              </div>
            );
          })}
        </div>
        <div className={styles.pokemonTypeChart}>
          <div>
            <p>
              <strong>X2 Damage</strong>
            </p>
            <img src="./sprites/type/icon-grass-type.png" alt="Pokemon type" />
          </div>
          <div>
            <p>
              <strong>X½ Damage</strong>
            </p>
            <img src="./sprites/type/icon-grass-type.png" alt="Pokemon type" />
          </div>
          <div>
            <p>
              <strong>X¼ Damage</strong>
            </p>
            <img src="./sprites/type/icon-grass-type.png" alt="Pokemon type" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetails