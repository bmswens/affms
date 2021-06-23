// to test
import db from './db'

let genders = [
    'male',
    'female'
]
// Checking all valid values takes a hot minute
jest.setTimeout(180000)

describe('The RunScoresheet', function() {
    it('should return false if something is wrong score', async function() {
        let score = await db.RunScoresheet.score('xyr', 22, 1000)
        expect(score).toBeFalsy()
    })
    it('should return the correct score', async function() {
        let score = await db.RunScoresheet.score('male', 19, 600)
        expect(score).toEqual(58)
    })
    it('should return "not false" for all valid values', async function() {
        // Make sure there was no bad data entry, test will take a while
        for (let gender of genders) {
            let age = 18
            while (age <= 65) {
                let count = 540
                while (count <= 1800) {
                    let score = await db.RunScoresheet.score(gender, age, count)
                    expect(score).not.toEqual(false)
                    count += 10
                }
                age += 5
            }
        }
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
    it('should return "not false" for all valid values', async function() {
        for (let gender of genders) {
            let age = 18
            while (age <= 65) {
                let count = 0
                while (count <= 70) {
                    let score = await db.PushScoresheet.score(gender, age, count)
                    expect(score).not.toEqual(false)
                    count += 1
                }
                age += 5
            }
        }
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
    it('should return "not false" for all valid values', async function() {
        for (let gender of genders) {
            let age = 18
            while (age <= 65) {
                let count = 0
                while (count <= 65) {
                    let score = await db.SitScoresheet.score(gender, age, count)
                    expect(score).not.toEqual(false)
                    count += 1
                }
                age += 5
            }
        }
    })
})