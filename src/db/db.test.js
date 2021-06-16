// Testing lib
import {
    waitFor
} from '@testing-library/react'

// Date stuff
import { addMonths } from 'date-fns'

// to test
import db from './db'
import Person from './Person'
import Test from './Test'

const lastYear = new Date()
lastYear.setFullYear(lastYear.getFullYear() - 1);

const person = {
    firstname: "John",
    lastname: "Doe",
    birthdate: lastYear,
    gender: "male",
    height: 70,
    weight: 175
}

describe('The Person Object', function () {
    let testee
    beforeEach(() => {
        testee = new Person(person)
    })
    it('should calculate the age correctly', function () {
        expect(testee.getAge()).toEqual(1)
    })
    it('should calculate BMI correctly', function () {
        expect(testee.getBMI()).toEqual(25.1)
    })
    it('should return BMI of 0 if no height or weight', function () {
        testee = new Person({
            firstname: "John",
            lastname: "Doe",
            birthdate: lastYear,
            gender: "male",
            height: 70
        })
        expect(testee.getBMI()).toEqual(0)
    })
    it('should throw an error in invalid person', function () {
        expect(() => {
            new Person({})
        }).toThrowError()
    })
})

describe('The Person Table', function () {
    afterEach(async () => {
        await db.PersonTable.clear()
    })
    it('should allow the user to read and write people to the database', async function () {
        await db.PersonTable.add(person)
        let people = await db.PersonTable.all()
        expect(people.length).toEqual(1)
    })
    it('should return a Person object', async function () {
        await db.PersonTable.add(person)
        let people = await db.PersonTable.all()
        expect(people[0] instanceof Person).toBeTruthy()
    })
    it('should allow a user to query', async function() {
        await db.PersonTable.add(person)
        await db.PersonTable.add({
            firstname: "Jane",
            lastname: "Doe",
            birthdate: lastYear,
            gender: "female"
        })
        let query1 = await db.PersonTable.query({firstname: "John", lastname: "Doe"})
        let query2 = await db.PersonTable.query({birthdate: lastYear})
        waitFor(() => {
            expect(query1.length).toEqual(1)
            expect(query2.length).toEqual(2)
        })
    })
    it('should be able to edit and already added person', async function() {
        await db.PersonTable.add(person)
        let people = await db.PersonTable.query({firstname: "John", lastname: "Doe"})
        expect(people[0].height).toEqual(70)
        people[0].height = 72
        people[0].save()
        people = await db.PersonTable.query({firstname: "John", lastname: "Doe"})
        expect(people[0].height).toEqual(72)
    })
    it('should delete a person and cascade delete their tests', async function() {
        await db.PersonTable.add(person)
        expect(await db.PersonTable.all()).toHaveLength(1)
        await db.TestTable.add(testInput)
        expect(await db.TestTable.all()).toHaveLength(1)
        await db.PersonTable.delete(person)
        expect(await db.PersonTable.all()).toHaveLength(0)
        expect(await db.TestTable.all()).toHaveLength(0)
    })
})

const now = new Date()
const nextSix = addMonths(new Date(), 6)
const nextYear = addMonths(new Date(), 12)
const testInput = {
    run: "09:10",
    push: 52,
    sit: 58,
    gender: "male",
    age: 24,
    firstname: "John",
    lastname: "Doe",
    date: now,
    official: true
}

describe('The Test Object', function() {
    let test
    function getDate(date) {
        return [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ]
    }
    beforeEach(async () => {
        test = new Test(testInput)
        await test.calculateScore()
    })
    it('should throw an error on missing key', function() {
        expect(() => {
            new Test({})
        }).toThrowError()
    })
    it('should calculate score correctly on normal input', function() {
        expect(test.score).toEqual(97.2)
    })
    it('should caclulcate score correctly with an exemption', async function() {
        test = new Test({
            ...testInput,
            run: "exempt"
        })
        await test.calculateScore()
        expect(test.score).toEqual(93)
    })
    it('should trigger an "exemption" flag if any were exempt', async function() {
        test = new Test({
            ...testInput,
            run: "exempt"
        })
        await test.calculateScore()
        expect(test.exemption).toBeTruthy()
    })
    it('should set score to "exempt" if all exempt', async function() {
        test = new Test({
            ...testInput,
            run: "exempt",
            sit: "exempt",
            push: "exempt"
        })
        await test.calculateScore()
        expect(test.score).toEqual("exempt")
    })
    it('should caclulate the next test due date for above 90', function() {
        let values = getDate(test.nextDue)
        let expected = getDate(nextYear)
        expect(values).toEqual(expected)
    })
    it('should calculate the next test due date for all others', async function() {
        let expected  = getDate(nextSix)
        test = new Test({
            ...testInput,
            run: "exempt"
        })
        await test.calculateScore()
        let values = getDate(test.nextDue)
        expect(values).toEqual(expected)
        test = new Test({
            ...testInput,
            run: "12:35",
            sit: 48,
            push: 45
        })
        await test.calculateScore()
        values = getDate(test.nextDue)
        expect(values).toEqual(expected)
    })
})

describe('The Test Table', function() {
    let test
    beforeEach(async () => {
        await db.TestTable.clear()
        await db.TestTable.add(testInput)
    })
    it('should allow a user to read and write to the database', async function() {
        let tests = await db.TestTable.all()
        expect(tests.length).toEqual(1)
    })
    it('should return a Test object', async function() {
        let tests = await db.TestTable.all()
        expect(tests[0] instanceof Test).toBeTruthy()
    })
    it('should have calculated the score on its own', async function() {
        let tests = await db.TestTable.all()
        expect(tests[0].score).toEqual(97.2)
    })
    it('should be able to query tests by person', async function() {
        await db.TestTable.add({
            ...testInput,
            firstname: 'Jane'
        })
        let tests = await db.TestTable.getByPerson(person)
        expect(tests.length).toEqual(1)
    })
    it('should return a sorted list of tests', async function() {
        await db.TestTable.add({
            ...testInput,
            date: lastYear,
            run: "exempt",
            sit: "exempt",
            push: "exempt"
        })
        let tests = await db.TestTable.getByPerson(person)
        expect(tests.length).toEqual(2)
        expect(tests[0].score).toEqual("exempt")
        expect(tests[1].score).toEqual(97.2)
    })
    it('should return the test when adding', async function() {
        let newTest = await db.TestTable.add(testInput)
        expect(newTest.score).toEqual(97.2)
    })
})