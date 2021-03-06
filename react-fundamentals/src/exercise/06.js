// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  //!6
  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   onSubmitUsername(event.target.elements.username.value);
  // }

  //! 6.1
  // const inputRef = React.createRef();
  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   onSubmitUsername(inputRef.current.value);
  // }

  //! 6.2
  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmitUsername(event.target.elements.username.value);
  }

  const onChangeHandler = (event) => {
    const {value} = event.target;
    const isValid = value === value.toLowerCase();
    setValue(value.toLowerCase());
    if(!isValid) {
      setIsError(true);
      return;
    }
    setIsError(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor={'username'}>Username:</label>
        <input /*ref={inputRef}*/ value={value} id={'username'} type="text" onChange={onChangeHandler}/>
      </div>
      {isError && <div style={{color: 'red'}}>Username must be lower case</div>}
      <button type="submit" disabled={isError}>Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
