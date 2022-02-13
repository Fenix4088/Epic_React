// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'
import userEvent from '@testing-library/user-event'
import {ThemeToggler} from '../../examples/easy-button'

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({children}) => <ThemeProvider>{children}</ThemeProvider>
  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: white;
      color: black
    `)
})

test('renders with the dark styles for the dark theme', () => {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={'dark'}>{children}</ThemeProvider>
  )

  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
      background-color: black;
      color: white
    `)
})

test('integration test for `Hit the easy button!`', () => {
  const Wrapper = ({children}) => <ThemeProvider>{children}</ThemeProvider>
  render(
    <>
      <h1>Hit the easy button!</h1>
      <hr />
      <EasyButton onClick={() => alert('that was easy')}>Easy!</EasyButton>
      <hr />
      <ThemeToggler />
    </>,
    {wrapper: Wrapper},
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
