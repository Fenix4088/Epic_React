// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {renderHook, act} from "@testing-library/react-hooks";

const UseCounterHookExample = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterHookExample />)
  const {getByText} = screen
  const message = getByText(/Current count: \d+$/i)
  // const [dec, inc] = getAllByRole('button');
  const inc = screen.getByRole('button', {name: /increment/i})
  const dec = screen.getByRole('button', {name: /decrement/i})

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(inc)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(dec)
  expect(message).toHaveTextContent('Current count: 0')
})

const setup = ({initialProps} = {}) => {
  let result = {}
  const UseCounterHookExampleWithoutJSX = () => {
    Object.assign(result, useCounter(initialProps))

    return null
  }

  render(<UseCounterHookExampleWithoutJSX />)
  return result
}

// it('exposes the count and increment/decrement functions (with `setup` func)', () => {
//   const result = setup();
//
//   expect(result.count).toBe(0)
//   act(() => result.increment())
//   expect(result.count).toBe(1)
//   act(() => result.decrement())
//   expect(result.count).toBe(0)
// })
//
// test('allows customization of the initial count (with `setup` func)', () => {
//   const result = setup({initialProps: {initialCount: 3}})
//   expect(result.count).toBe(3)
// })
//
// test('allows customization of the step (with `setup` func)', () => {
//   const result = setup({initialProps: {step: 2}})
//   expect(result.count).toBe(0)
//   act(() => result.increment());
//   expect(result.count).toBe(2);
//   act(() => result.decrement())
//   expect(result.count).toBe(0)
// })


it('exposes the count and increment/decrement functions (with `setup` func)', () => {
  const {result} = renderHook(useCounter)

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count (with `setup` func)', () => {
  const {result} = renderHook(() => useCounter({initialCount: 3}))
  expect(result.current.count).toBe(3)
})

test('allows customization of the step (with `setup` func)', () => {
  const {result} = renderHook(() => useCounter({step: 2}))

  expect(result.current.count).toBe(0)
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
