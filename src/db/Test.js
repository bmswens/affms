// Date stuff
import { addMonths } from 'date-fns'

// db lookups
import db from './db'

// conversion
import { convertTime } from './loadScoresheet'

class Test {
    constructor(object) {
        let required = [
            'firstname',
            'lastname',
            'date',
            'gender',
            'run',
            'push',
            'sit',
            'official'
        ]
        for (let key of required) {
            if (object[key] === undefined) {
                throw new Error(`Missing ${key} parameter.`)
            }
        }
        for (let key in object) {
            this[key] = object[key]
        }
    }
    async calculateScore() {
        let total = 100
        let points = []
        this.exemption = false
        if (this.run === "exempt") {
            total -= 60
            this.runScore = 'exempt'
            this.exemption = true
        }
        else {
            let runSeconds = convertTime(this.run)
            this.runScore = await db.RunScoresheet.score(this.gender, this.age, runSeconds)
            points.push(this.runScore)
        }
        if (this.push === "exempt") {
            total -= 20
            this.pushScore = "exempt"
            this.exemption = true
        }
        else {
            this.pushScore = await db.PushScoresheet.score(this.gender, this.age, this.push)
            points.push(this.pushScore)
        }
        if (this.sit === "exempt") {
            total -= 20
            this.sitScore = "exempt"
            this.exemption = true
        }
        else {
            this.sitScore = await db.SitScoresheet.score(this.gender, this.age, this.sit)
            points.push(this.sitScore)
        }
        if (total === 0) {
            this.score = 'exempt'
            this.nextDue = addMonths(this.date, 6)
        }
        else {
            let score = points.reduce((a, b) => a + b, 0)
            if (total !== 100) {
                this.score = (score / total) * 100
                this.nextDue = addMonths(this.date, 6)
            }
            else {
                this.score = score
                if (this.score >= 90) {
                    this.nextDue = addMonths(this.date, 12)
                }
                else {
                    this.nextDue = addMonths(this.date, 6)
                }
            }
        }
        if (this.score === 'exempt' || this.score >= 75) {
            this.pass = true
        }
        else {
            this.pass = false
        }
    }
}

export default Test