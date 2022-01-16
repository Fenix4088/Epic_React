// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";

export const useGetPokemon = (pokemonName = '') => {
    const [pokemon, setPokemon] = React.useState({pokemon: null, fetchingStatus: 'idle', errorMessage: ''});

    // const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        if (!pokemonName) return;
        setPokemon({pokemon: null, fetchingStatus: 'pending', errorMessage: ''});
        // setErrorMessage('');

        fetchPokemon(pokemonName)
            .then(pokemonInfo => {
                setPokemon({pokemon: pokemonInfo, fetchingStatus: 'resolved', errorMessage: ''});
            })
            .catch(error => {
                setPokemon({pokemon: null, fetchingStatus: 'rejected', errorMessage: error.message});

            })

    }, [pokemonName])

    return {
        pokemon: pokemon.pokemon,
        status: pokemon.fetchingStatus,
        errorMessage: pokemon.errorMessage
    }
}

function PokemonInfo({pokemonName}) {
    // 🐨 Have state for the pokemon (null)

    const {pokemon, status, errorMessage} = useGetPokemon(pokemonName);

    // 🐨 use React.useEffect where the callback should be called whenever the
    // pokemon name changes.
    // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
    // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* update all the state here */},
    //   )


    // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
    //   1. no pokemonName: 'Submit a pokemon'
    //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
    //   3. pokemon: <PokemonDataView pokemon={pokemon} />

    if (status === 'idle') {
        return <div>Submit a pokemon</div>
    } else if (status === 'pending') {
        return <PokemonInfoFallback name={pokemonName}/>
    } else if (status === 'resolved') {
        return <PokemonDataView pokemon={pokemon}/>
    } else if (status === 'rejected') {
        // return <ErrorMessage message={errorMessage}/>
        throw new Error(errorMessage)
    }

}

export const ErrorMessage = ({message = ''}) => {
    return (
        <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{message}</pre>
        </div>
    )
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorDetails: null
        }
    }

    static getDerivedStateFromError(error) {
        console.log(error)
        return {hasError: true, errorDetails: error}
    }

    render() {
        if (this.state.hasError) {
            return <this.props.ErrorComponent message={this.state.errorDetails.toString()}/>
        }

        return this.props.children;
    }
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
                <ErrorBoundary ErrorComponent={ErrorMessage}>
                    <PokemonInfo pokemonName={pokemonName}/>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default App
