// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
// import faker from 'faker';
import {build, fake} from '@jackfranklin/test-data-bot';

// const buildLoginForm = (overrides) => {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides
//   }
// }

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {

  const {username, password} = buildLoginForm()

  const handleSubmit = jest.fn();

    render(<Login onSubmit={handleSubmit}/>)

    const {getByRole, getByLabelText} = screen;

    const usernameInput = getByLabelText(/username/gi);
    const passwordInput = getByLabelText(/password/gi);
    const submitBtn = getByRole('button', {name: /submit/gi})

    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    userEvent.click(submitBtn);

  expect(handleSubmit).toHaveBeenCalledWith({username, password});
  expect(handleSubmit).toHaveBeenCalledTimes(1);
})

/*
eslint
  no-unused-vars: "off",
*/
