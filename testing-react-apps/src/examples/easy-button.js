// http://localhost:3000/easy-button

import * as React from 'react'
import EasyButton from '../components/easy-button'
import {ThemeProvider, useTheme} from '../components/theme'

function App() {
  return (
    <ThemeProvider>
      <h1>Hit the easy button!</h1>
      <hr />
      <EasyButton onClick={() => alert('that was easy')}>Easy!</EasyButton>
      <hr />
      <ThemeToggler />
    </ThemeProvider>
  )
}

export function ThemeToggler() {
  const [theme, setTheme] = useTheme()
  return (
    <button data-testid="change-theme-btn" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
      Toggle theme: {theme}
    </button>
  )
}

export default App
