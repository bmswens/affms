// to test
import db from './db'

describe('The RunScoresheet', function() {
    it('should return false if something is wrong score', async function() {
        let score = await db.RunScoresheet.score('xyr', 22, 1000)
        expect(score).toBeFalsy()
    })
    it('should return the correct score', async function() {
        let score = await db.RunScoresheet.score('male', 19, 600)
        expect(score).toEqual(58)
    })
})

describe('The PushScoresheet', function() {
    it('should return false if something is wrong score', async function() {
        let score = await db.PushScoresheet.score('xyr', 22, 31)
        expect(score).toBeFalsy()
    })
    it('should return the correct score', async function() {
        let score = await db.PushScoresheet.score('male', 19, 52)
        expect(score).toEqual(17.2)
    })
})

describe('The SitScoresheet', function() {
    it('should return false if something is wrong score', async function() {
        let score = await db.SitScoresheet.score('xyr', 22, 31)
        expect(score).toBeFalsy()
    })
    it('should return the correct score', async function() {
        let score = await db.SitScoresheet.score('male', 19, 60)
        expect(score).toEqual(20)
    })
})