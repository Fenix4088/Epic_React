// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {

  let submittedData = null
  const expectedInputData = {
    username: 'Bill',
    password: '123'
  }
  /**
   *
   * @param {Object} data
   * @param {string} data.username
   * @param {string} data.password
   * @return {void}
   */
  const handleSubmit = data => {
    submittedData = data
  }

    render(<Login onSubmit={handleSubmit}/>)

    const {getByRole, getByLabelText, debug} = screen;

    const usernameInput = getByLabelText(/username/gi);
    const passwordInput = getByLabelText(/password/gi);
    const submitBtn = getByRole('button', {name: /submit/gi})

    userEvent.type(usernameInput, expectedInputData.username);
    userEvent.type(passwordInput, expectedInputData.password);
    userEvent.click(submitBtn);

  expect(submittedData).toEqual(expectedInputData);
})

/*
eslint
  no-unused-vars: "off",
*/
