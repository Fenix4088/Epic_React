// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'


export const createResource = (promise) => {
    let status = 'pending';
    let result = promise.then(resolved => {
        status = 'success';
        result = resolved;
    }).catch(rejected => {
        status = 'error'
        result = rejected;
    });

    return {
        read() {
            if (status === 'pending') throw result
            if (status === 'error') throw result
            if (status === 'success') return result
            throw new Error('This should be impossible')
        }
    }

}

const pokemonResource = createResource(fetchPokemon('pikachu'));

function PokemonInfo() {
    const pokemon = pokemonResource.read();

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<div>Loading...</div>}>
          <PokemonErrorBoundary>
            <PokemonInfo />
          </PokemonErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
