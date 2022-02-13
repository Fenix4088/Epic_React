// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'
import {ThemeToggler} from '../../examples/easy-button'

const renderWithThemeProvider = (
  Component = <></>,
  providerProps = {initialTheme: 'light'},
  options,
) => {
  const Wrapper = ({children}) => (
    <ThemeProvider {...providerProps}>{children}</ThemeProvider>
  )
  return render(Component, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  renderWithThemeProvider(<EasyButton>Easy!</EasyButton>)

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: white;
      color: black
    `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithThemeProvider(<EasyButton>Easy!</EasyButton>, {
    initialTheme: 'dark',
  })

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: black;
      color: white
    `)
})

test('integration test for `Hit the easy button!`', () => {
  renderWithThemeProvider(
    <>
      <h1>Hit the easy button!</h1>
      <hr />
      <EasyButton onClick={() => alert('that was easy')}>Easy!</EasyButton>
      <hr />
      <ThemeToggler />
    </>,
  )

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: white; 
      color: black
    `)

  const changeThemeBtn = screen.getByTestId('change-theme-btn')

  userEvent.click(changeThemeBtn)

  expect(button).toHaveStyle(`
      background-color: black; 
      color: white
    `)
})

/* eslint no-unused-vars:0 */
