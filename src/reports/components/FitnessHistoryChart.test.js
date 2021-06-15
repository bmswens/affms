// React
import React from 'react'

// testing library
import {
    screen,
    render,

} from '@testing-library/react'

// test data
import { tests } from './FitnessHistoryGrid.test'

// to test
import FitnessHistoryChart from './FitnessHistoryChart'
import { lineColorFunctions } from './FitnessHistoryChart'

describe('<FitnessHistoryChart />', function() {
    it('should just be a "card" containing a Chart.js chart', function() {
        render(<FitnessHistoryChart tests={tests} />)
        let title = screen.queryByText(/Fitness History Chart/)
        expect(title).not.toBeNull()
    })
    it('should have helper functions to help color the lines', function() {
        let context = {
            dataIndex: 0,
            dataset: {
                data: [
                    70
                ]
            }
        }
        expect(lineColorFunctions.compositeScore(context)).toEqual('red')
        expect(lineColorFunctions.compositeScore({...context, dataset: {data: [76]}})).toEqual('green')
        expect(lineColorFunctions.runScore({...context, dataset: {data: [42]}})).toEqual('red')
        expect(lineColorFunctions.runScore({...context, dataset: {data: [60]}})).toEqual('green')
        expect(lineColorFunctions.upScore({...context, dataset: {data: [9]}})).toEqual('red')
        expect(lineColorFunctions.upScore({...context, dataset: {data: [12]}})).toEqual('green')
    })
})