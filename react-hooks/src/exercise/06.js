// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";

function PokemonInfo({pokemonName}) {
    // 🐨 Have state for the pokemon (null)
    const [pokemon, setPokemon] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');
    // 🐨 use React.useEffect where the callback should be called whenever the
    // pokemon name changes.
    // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
    // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* update all the state here */},
    //   )

    useEffect(() => {
        if (!pokemonName) return;
        setPokemon(null);
        setErrorMessage('');
        fetchPokemon(pokemonName)
            .then(pokemonInfo => setPokemon(pokemonInfo))
            .catch(error => setErrorMessage(error.message))

    }, [pokemonName])

    // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
    //   1. no pokemonName: 'Submit a pokemon'
    //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
    //   3. pokemon: <PokemonDataView pokemon={pokemon} />


    if (errorMessage) return <ErrorMessage message={errorMessage}/>

    if (pokemon) {
        return <PokemonDataView pokemon={pokemon}/>
    } else {
        return <PokemonInfoFallback name={pokemonName}/>
    }

    // return <>
    //     {
    //         if(pokemon) {
    //             return <PokemonDataView pokemon={pokemon}/>
    //     } else if(!pokemon && !errormessagw) {}
    //     }
    //
    //     {pokemon ? <PokemonDataView pokemon={pokemon}/> : <PokemonInfoFallback name={pokemonName}/>}
    // </>
}

export const ErrorMessage = ({message = ''}) => {
    return (
        <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{message}</pre>
        </div>
    )
}

function App() {
    const [pokemonName, setPokemonName] = React.useState('')

    function handleSubmit(newPokemonName) {
        setPokemonName(newPokemonName)
    }

    return (
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit}/>
            <hr/>
            <div className="pokemon-info">
                <PokemonInfo pokemonName={pokemonName}/>
            </div>
        </div>
    )
}

export default App
