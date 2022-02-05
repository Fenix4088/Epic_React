// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)

  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  const CustomMouseEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  });

  expect(message.textContent).toBe('Current count: 0');
  increment.dispatchEvent(CustomMouseEvent);
  expect(message.textContent).toBe('Current count: 1');
  decrement.dispatchEvent(CustomMouseEvent);
  expect(message.textContent).toBe('Current count: 0');

  div.remove();
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
