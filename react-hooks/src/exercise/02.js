// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
    const [state, setState] = React.useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key)
        if (valueInLocalStorage) {
            return deserialize(valueInLocalStorage)
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })

    const prevKeyRef = React.useRef(key)

    React.useEffect(() => {
        const prevKey = prevKeyRef.current
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key
        window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
}

function Greeting({initialName = ''}) {
    // 🐨 initialize the state to the value from localStorage
    // 💰 window.localStorage.getItem('name') ?? initialName
    /*  const getFromLS = () => {
        console.log('get')
        return window.localStorage.getItem('name')
      }
      const [name, setName] = React.useState(() => getFromLS() ?? initialName)*/

    // 🐨 Here's where you'll use `React.useEffect`.
    // The callback should set the `name` in localStorage.
    // 💰 window.localStorage.setItem('name', name)

    /*  React.useEffect(() => {
        window.localStorage.setItem('name', name)
      }, [name])*/


    const [state, setState] = useLocalStorageState('name', initialName)

    function handleChange(event) {
        setState(event.target.value)
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name: </label>
                <input value={state} onChange={handleChange} id="name"/>
            </form>
            {state ? <strong>Hello {state}</strong> : 'Please type your name'}
        </div>
    )
}

function App() {
    return <Greeting/>
}

export default App
