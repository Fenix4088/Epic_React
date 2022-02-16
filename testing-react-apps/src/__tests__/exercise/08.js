// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

 const UseCounterHookExample = () => {
    const {count, increment, decrement} = useCounter();

     return (
         <div>
             <div>Current count: {count}</div>
             <button onClick={decrement}>Decrement</button>
             <button onClick={increment}>Increment</button>
         </div>
     )

}

test('exposes the count and increment/decrement functions', () => {
    render(<UseCounterHookExample/>)
    const {getByText} = screen;
    const message = getByText(/Current count: \d+$/i);
    // const [dec, inc] = getAllByRole('button');
    const inc = screen.getByRole('button', {name: /increment/i})
    const dec = screen.getByRole('button', {name: /decrement/i})

    expect(message).toHaveTextContent('Current count: 0');
    userEvent.click(inc);
    expect(message).toHaveTextContent('Current count: 1');
    userEvent.click(dec);
    expect(message).toHaveTextContent('Current count: 0');

})

let result;
const UseCounterHookExampleWithoutJSX = () => {
    result = useCounter();

    return null
}

it('exposes the count and increment/decrement functions (without JSX)', () => {
    let result;
    const UseCounterHookExampleWithoutJSX = () => {
        result = useCounter();

        return null
    }
    render(<UseCounterHookExampleWithoutJSX/>)

    expect(result.count).toBe(0);
    act(() => result.increment())
    expect(result.count).toBe(1);
    act(() => result.decrement())
    expect(result.count).toBe(0);

});

/* eslint no-unused-vars:0 */
