import fs from 'fs'
import path from 'path'

// MSW
import { rest } from 'msw'

const handlers = [
    rest.get('/scoresheet/run.csv', (req, res, ctx) => {
        let location = path.join(__dirname, '..', '..', 'public', 'scoresheet', 'run.csv')
        let file = fs.readFileSync(location)
        return res(ctx.status(200), ctx.text(file))
    }),
    rest.get('/scoresheet/sit.csv', (req, res, ctx) => {
        let location = path.join(__dirname, '..', '..', 'public', 'scoresheet', 'sit.csv')
        let file = fs.readFileSync(location)
        return res(ctx.status(200), ctx.text(file))
    }),
    rest.get('/scoresheet/push.csv', (req, res, ctx) => {
        let location = path.join(__dirname, '..', '..', 'public', 'scoresheet', 'push.csv')
        let file = fs.readFileSync(location)
        return res(ctx.status(200), ctx.text(file))
    })
]

export default handlers