// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from "react-use-geolocation";

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// jest.mock('react-use-geolocation');

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 46.4388096,
      longitude: 30.7101696,
    },
  }

/*  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition);*/

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(callback =>
    promise.then(() => callback(fakePosition)),
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // act(() => setReturnValue([fakePosition]));

  await act(async () => {
    // If you'd like, learn about what this means and see if you can figure out
    // how to make the warning go away (tip, you'll need to use async act)
    // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    resolve()
    await promise
  })


  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`);
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`);
})

test('displays error message when geolocation is not supported', async () => {
  const fakeError = new Error('Geolocation is not supported or permission denied');
  const {promise, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation((successClb, errorClb) => promise.catch(() => errorClb(fakeError)));

  render(<Location/>);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    reject();
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message);

});

/*
eslint
  no-unused-vars: "off",
*/
