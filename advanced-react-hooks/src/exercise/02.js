// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
    fetchPokemon,
    PokemonForm,
    PokemonDataView,
    PokemonInfoFallback,
    PokemonErrorBoundary,
} from '../pokemon'
import {useCallback, useEffect, useLayoutEffect} from "react";


const useSafeDispatch = (dispatch) => {
    const isMounted = React.useRef(false);

    useLayoutEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    return useCallback((...args) => isMounted.current ? dispatch(...args) : void 0, [dispatch])
}

// 🐨 this is going to be our generic asyncReducer
function pokemonInfoReducer(state, action) {
    switch (action.type) {
        case 'pending': {
            return {status: 'pending', data: null, error: null}
        }
        case 'resolved': {
            return {status: 'resolved', data: action.data, error: null}
        }
        case 'rejected': {
            return {status: 'rejected', data: null, error: action.error}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const useAsync = (initialState = {}) => {
    const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
    })

    const safeDispatch = useSafeDispatch(dispatch)

     const run = useCallback((promise) => {
         if (!promise) {
             return
         }

         safeDispatch({type: 'pending'})
         promise.then(
             data => {
                 safeDispatch({type: 'resolved', data})
             },
             error => {
                 safeDispatch({type: 'rejected', error})
             },
         )
    }, [])

    return {status: state.status, data: state.data, error: state.error, run};
}

function PokemonInfo({pokemonName}) {

    const {data, status, error, run} = useAsync( {status: pokemonName ? 'pending' : 'idle'})

    useEffect(() => {
        console.log('Effect')
        if(!pokemonName) return;

        run(fetchPokemon(pokemonName))

    }, [pokemonName])

    useLayoutEffect(() => {
        console.log('Layout')
    }, [])

    switch (status) {
        case 'idle':
            return <span>Submit a pokemon</span>
        case 'pending':
            return <PokemonInfoFallback name={pokemonName}/>
        case 'rejected':
            throw error
        case 'resolved':
            return <PokemonDataView pokemon={data}/>
        default:
            throw new Error('This should be impossible')
    }
}

function App() {
    const [pokemonName, setPokemonName] = React.useState('')

    function handleSubmit(newPokemonName) {
        setPokemonName(newPokemonName)
    }

    function handleReset() {
        setPokemonName('')
    }

    return (
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit}/>
            <hr/>
            <div className="pokemon-info">
                <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
                    <PokemonInfo pokemonName={pokemonName}/>
                </PokemonErrorBoundary>
            </div>
        </div>
    )
}

function AppWithUnmountCheckbox() {
    const [mountApp, setMountApp] = React.useState(true)
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={mountApp}
                    onChange={e => setMountApp(e.target.checked)}
                />{' '}
                Mount Component
            </label>
            <hr/>
            {mountApp ? <App/> : null}
        </div>
    )
}

export default AppWithUnmountCheckbox
