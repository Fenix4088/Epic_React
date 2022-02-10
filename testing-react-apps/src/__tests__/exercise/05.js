// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from "../../test/server-handlers";

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// const server = setupServer(
//     rest.post('https://auth-provider.example.com/api/login', async (req, res, ctx) => {
//       if(!req.body.password) {
//         return res(ctx.status(400), ctx.json({message: 'password required'}))
//       }
//
//       if(!req.body.username) {
//         return res(ctx.status(400), ctx.json({message: 'username required'}))
//       }
//
//       return res(ctx.json({
//           username: req.body.username
//         }));
//     })
// )

const server = setupServer(...handlers)

// 📜 https://mswjs.io/

beforeAll(() => {
  server.listen();
})

afterAll(() => {
  server.close();
})

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)).then(() => console.log('Element no longer in DOM')).catch((err) => console.log(err))

  expect(screen.getByText(username)).toBeVisible();
})

test(`omitting the password results in an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i)).then(() => console.log('Element no longer in DOM')).catch((err) => console.log(err))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot('"password required"');
})


test('unknown server error displays the error message', async () => {
  const testErrorMessage = 'Oh no, something bad happened'
  server.use(
      rest.post(
          'https://auth-provider.example.com/api/login',
          async (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: testErrorMessage}))
          },
      ),
  )
  render(<Login />)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
