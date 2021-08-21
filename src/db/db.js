// database manager
import Dexie from 'dexie';

// scoresheet loader
import loadScoresheet from './loadScoresheet'

// Classes
import Person from './Person'
import Test from './Test'

const db = new Dexie('affms')
db.version(1).stores({
    tests: '++id, date, official, gender, age, push, pushPoints, sit, sitPoints, run, runPoints, score, pass, [firstname+lastname]',
    people: '[firstname+lastname], birthdate, gender, height, weight, rank, organization',
    run: '++id, gender, ageLow, ageHigh, countLow, countHigh, score',
    push: '++id, gender, ageLow, ageHigh, countLow, countHigh, score',
    sit: '++id, gender, ageLow, ageHigh, countLow, countHigh, score'
})

// Scoresheet stuff
db.on("ready", async function() {
    if (await ready() === false) {
        await loadScoresheet(db)
    }
})

async function ready() {
    let components = [
        "run",
        "sit",
        "push"
    ]
    for (let component of components) {
        let data = await db[component].toArray()
        if (!data.length) {
            return false
        }
    }
    return true
}

async function score(table, gender, age, count) {
    let results = await table
    .where("gender").equals(gender)
    .and(function(row) {
        let ageOK = row.ageLow <= age && age <= row.ageHigh
        let countOK = row.countLow <= count && count <= row.countHigh
        return ageOK && countOK
    })
    let rows = await results.toArray()
    if (rows.length === 1) {
        return rows[0].score
    }
    else {
        return false
    }
}

const RunScoresheet = {
    score: async function(gender, age, count) {
        return await score(db.run, gender, age, count)
    }
}

const PushScoresheet = {
    score: async function(gender, age, count) {
        return await score(db.push, gender, age, count)
    }
}

const SitScoresheet = {
    score: async function(gender, age, count) {
        return await score(db.sit, gender, age, count)
    }
}

// Update classes to work with Dexie
Person.prototype.save = async function() {
    this.lastUpdated = new Date()
    let response = await db.people.put(this)
    return response
}
db.people.mapToClass(Person)

const PersonTable = {
    add: async function(data) {
        return db.transaction('rw', db.people, async () => {
            data.lastUpdated = new Date()
            return await db.people.add(data)
        })
    },
    all: async function() {
        let people = await db.people.toArray()
        return people 
    },
    query: async function(params) {
        let output = []
        let results = await db.people.where(params)
        let count = await results.count()
        if (count) {
            output = results.toArray()
        }
        return output
    },
    clear: async function() {
        await db.people.clear()
    },
    delete: async function(person) {
        let { firstname, lastname } = person
        await db.people.where({firstname, lastname}).delete()
        await db.tests.where({firstname, lastname}).delete()
    }
}

Test.prototype.save = function() {
    return db.tests.put(this)
}
db.tests.mapToClass(Test)

const TestTable = {
    clear: async function() {
        await db.tests.clear()
    },
    add: async function(data) {
        if (data instanceof Test === false) {
            data = new Test(data)
            await data.calculateScore()
        }
        let id =  await db.transaction('rw', db.tests, async () => {
            return await db.tests.add(data)
        })
        let newTest = await db.tests.where("id").equals(id).toArray()
        return newTest[0]
    },
    all: async function() {
        let tests = await db.tests.toArray()
        return tests 
    },
    getByPerson: async function(person, officialOnly=false) {
        let tests = await db.tests.where({firstname: person.firstname, lastname: person.lastname}).toArray()
        if (officialOnly) {
            tests = tests.filter(test => test.official)
        }
        else {
        }
        tests = tests.sort(sortByDate)
        return tests
    },
    deleteByPerson: async function(person) {
        await db.tests.where({firstname: person.firstname, lastname: person.lastname}).delete()
    }
}

const OrgTable = {
    getByOrg: async function(org) {
        let output 
        if (org === "All") {
            output = await db.people.toArray()
        }
        else {
            output = await db.people.where({organization: org}).toArray()
        }
        for (let person of output) {
            person.tests = await TestTable.getByPerson(person)
        }
        return output
    },
    getAll: async function() {
        let output = []
        let people = await db.people.toArray()
        for (let person of people) {
            if (!output.includes(person.organization) && person.organization !== undefined) {
                output.push(person.organization)
            }
        }
        return output
    }
}

function sortByDate(a, b) {
    return a.date - b.date
}

const DB = {
    PersonTable: PersonTable,
    RunScoresheet: RunScoresheet,
    PushScoresheet: PushScoresheet,
    SitScoresheet: SitScoresheet,
    TestTable: TestTable,
    OrgTable: OrgTable,
    ready: ready
}

export default DB