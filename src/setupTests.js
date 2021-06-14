// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import "fake-indexeddb/auto"
import 'jest-canvas-mock'
import { waitFor } from '@testing-library/react'
import db from './db/db'

// Fake our self-hosted .csv
import { server } from './mocks/server.js'
beforeAll(async() => {
    jest.setTimeout(10000)
    server.listen()
    await waitFor(async () => {
        expect(await db.ready()).toBeTruthy()
    })
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// We're not here to test other people's packages
jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
    Pie: () => null,
    Line: () => null
}))