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

type PokemonSpecieData = {
  species: {
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
  evolutionDetail: PokemonEvolutionDetailsData[];
  evolvesTo: PokemonEvolutionChainData[];
  isBaby: boolean;
  species: {
    name: string;
    url: string;
  };
  chain?: {
    name: "";
    url: "";
    id: 0;
  };
  evolution1?: {
    name?: "";
    url?: "";
    id?: 0;
  };
  evolution2?: {
    name?: "";
    url?: "";
    id?: 0;
  };
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

const initialState = {
  id: 0,
  name: "",
  description: "",
  types: [],
  stats: [],
  evolution: {
    evolutionDetail: [],
    evolvesTo: [],
    isBaby: false,
    species: {
      name: "",
      url: "",
    },
  },
};

function PokemonDetails() {
  const { url, zIndex, setZIndexComponent } = usePokemonDetails();

  const [pokemonDetailsData, setPokemonDetailsData] = useState<PokemonDetailsData>(initialState)

  function resetPokemonDetailsData() {
    setZIndexComponent(0);
  }

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
                let evolution = {};
                evolution = {
                  chain: {
                    ...data.chain.species,
                    id: parseInt(data.chain.species.url.split("/", 7)[6])
                  },
                  evolution1: {
                    ...data?.chain?.evolves_to[0]?.species,
                    id: parseInt(
                      data?.chain?.evolves_to[0]?.species.url.split("/", 7)[6]
                    ),
                  },
                  evolution2: {
                    ...data?.chain?.evolves_to[0]?.evolves_to[0]?.species,
                    id: parseInt(
                      data?.chain?.evolves_to[0]?.evolves_to[0]?.species.url.split(
                        "/",
                        7
                      )[6]
                    ),
                  },
                };

                pokemonDetails = {
                  ...pokemonDetails,
                  evolution
                };

                setPokemonDetailsData(pokemonDetails);
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
    <section className={styles.pokemonDetails} style={{ zIndex: zIndex }}>
      <div
        className={styles.pokemonHeader}
        style={{
          backgroundColor: `var(--${pokemonDetailsData?.types[0]?.type?.name}-type)`,
        }}
      >
        <div className={styles.pokemonTitle}>
          <h1>{pokemonDetailsData?.name}</h1>
          <div className={styles.pokemonType}>
            {pokemonDetailsData?.types[0]?.type?.name && (
              <img
                src={`./type/icon-${pokemonDetailsData.types[0].type.name}-type.png`}
                alt="Pokemon type"
              />
            )}
            {pokemonDetailsData?.types[1]?.type?.name && (
              <img
                src={`./type/icon-${pokemonDetailsData.types[1].type.name}-type.png`}
                alt="Pokemon type"
              />
            )}
          </div>
        </div>
        <div className={styles.pokemonImage}>
          {pokemonDetailsData.id ? (
            <img
              src={`./official-artwork/${pokemonDetailsData.id}.png`}
              alt="Pokemon Image"
            />
          ) : (
            ""
          )}
        </div>
        <button
          className={styles.closeButton}
          onClick={() => {
            resetPokemonDetailsData();
          }}
        >
          ✖
        </button>
      </div>
      {pokemonDetailsData.name && (
        <div className={styles.pokemonBody}>
          <p className={styles.chip}>Info</p>
          <div className={styles.pokemonInfo}>
            <p>{pokemonDetailsData?.description}</p>
            <div className={styles.pokemonStatusList}>
              {pokemonDetailsData?.stats?.map((stat: any) => {
                return (
                  <div
                    key={stat.stat.name}
                    className={styles.pokemonStatusItem}
                  >
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
            {pokemonDetailsData.evolution.chain ? (
              <div>
                <img
                  src={`./official-artwork/${pokemonDetailsData?.evolution.chain.id}.png`}
                  alt="Pokemon Image"
                />
                <p>
                  <strong>{pokemonDetailsData?.evolution.chain.name}</strong>
                </p>
                <p>&nbsp;</p>
              </div>
            ) : (
              ""
            )}
            {pokemonDetailsData?.evolution.evolution1?.name && <span>→</span>}
            {pokemonDetailsData.evolution.evolution1?.name ? (
              <div>
                <img
                  src={`./official-artwork/${pokemonDetailsData?.evolution.evolution1.id}.png`}
                  alt="Pokemon Image"
                />
                <p>
                  <strong>
                    {pokemonDetailsData?.evolution.evolution1.name}
                  </strong>
                </p>
                <p>&nbsp;</p>
              </div>
            ) : (
              ""
            )}
            {pokemonDetailsData?.evolution.evolution2?.name && <span>→</span>}
            {pokemonDetailsData.evolution.evolution2?.name ? (
              <div>
                <img
                  src={`./official-artwork/${pokemonDetailsData?.evolution.evolution2.id}.png`}
                  alt="Pokemon Image"
                />
                <p>
                  <strong>
                    {pokemonDetailsData?.evolution.evolution2.name}
                  </strong>
                </p>
                <p>&nbsp;</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default PokemonDetails