// Date functions
import { differenceInYears } from 'date-fns'



class Person {
    constructor(object) {
        let required = [
            'firstname',
            'lastname',
            'birthdate',
            'gender'
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
    getAge() {
        return differenceInYears(new Date(), this.birthdate)
    }
    getBMI() {
        let weight = Number(this.weight)
        let height = Number(this.height)
        if (Number.isNaN(weight) || Number.isNaN(height)) {
            return 0
        }
        else {
            let output = (weight / (height * height)) * 703
            return Number(output.toFixed(1))
        }
    }
}

export default Person