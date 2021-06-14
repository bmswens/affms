// React
import React from 'react'

// Date things
import { 
    subMonths,
    addMonths
 } from 'date-fns'

// testing library
import {
    screen,
    render,
    fireEvent,
    waitFor,
    within,
    cleanup
} from '@testing-library/react'

// help
import { formatDate } from '../people/PeoplePage'

// to test
import {
    DueDisplay,
    LevelDisplay,
    PointDisplay,
    TrendingIcon,
    FitnessHistoryChart,
    lineColorFunctions,
    StrengthAndWeakness,
    FitnessHistoryGrid
} from './SingleReportComponents'

describe('<DueDisplay />', function() {
    let dueDate = addMonths(new Date(), 4)
    it('should display the duedate', function() {
        let expected = formatDate(dueDate)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        expect(screen.queryByText(expected)).not.toBeNull()
    })
    it('should display the status "Current" if there\'s more than 2 months prior to duedate', function() {
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Current'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Due Soon" if it is the month before it is due', function() {
        dueDate = addMonths(new Date(), 1)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Due Soon'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Due" if it is the month that it is due', function() {
        dueDate = new Date()
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Due Now'})
        expect(text).not.toBeNull()
    })
    it('should display the status "Overdue" if it is past the month that it is due', function() {
        dueDate = subMonths(new Date(), 1)
        render(
            <DueDisplay
                nextDue={dueDate}
            />
        )
        let text = screen.queryByRole('heading', {name: 'Overdue'})
        expect(text).not.toBeNull()
    })
})

describe('<LevelDisplay />', function() {
    let points = 0
    it('should display "Unsatisfactory" if points < 75', function() {
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Unsatisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Satisfactory" if points 75 <= points < 90', function() {
        points = 80
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Satisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Satisfactory" if points 75 <= points < 90 (different color)', function() {
        points = 85
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Satisfactory"})
        expect(text).not.toBeNull()
    })
    it('should display "Excellent" if 90 <= points', function() {
        points = 90
        render(
            <LevelDisplay
                points={points}
            />
        )
        let text = screen.queryByRole('heading', {name: "Excellent"})
        expect(text).not.toBeNull()
    })
})

describe('<TrendingIcon />', function() {
    it('should return null if nothing to compare', function() {
        const { container } = render(<TrendingIcon newValue={52} />)
        expect(container.children.length).toEqual(0)
    })
    it('should display the "up" icon if newValue > oldValue', function() {
        render(<TrendingIcon newValue={52} oldValue={51} />)
        let upIcon = screen.queryByTitle('Trending Up Icon')
        expect(upIcon).not.toBeNull()
    })
    it('should display the "down" icon if newValue < oldValue', function() {
        render(<TrendingIcon newValue={52} oldValue={53} />)
        let upIcon = screen.queryByTitle('Trending Down Icon')
        expect(upIcon).not.toBeNull()
    })
    it('should display the "flat" icon if newValue === oldValue', function() {
        render(<TrendingIcon newValue={52} oldValue={52} />)
        let upIcon = screen.queryByTitle('Trending Flat Icon')
        expect(upIcon).not.toBeNull()
    })
})

describe('<PointDisplay />', function() {
    beforeEach(() => {
        render(
            <PointDisplay
                component={"Push Up"}
                count={54}
                points={16.3}
                oldCount={53}
                oldPoints={17}
            />
        )
    })
    it('should dipslay the title with component name', function() {
        let title = screen.queryByText(/Push Up/)
        expect(title).not.toBeNull()
    })
    it('should display the front side "count" by default', function() {
        let count = screen.queryByText("54")
        expect(count).not.toBeNull()
    })
    it('should be able to be clicked on to display "points"', function() {
        let points = screen.queryByText('16.3')
        expect(points).toBeNull()
        let card = screen.getByRole('button', {name: "Push Up Card"})
        fireEvent.click(card)
        points = screen.queryByText('16.3')
        expect(points).not.toBeNull()
    })
})

const tests = [
    {
        id: 1,
        date: new Date(),
        pushPoints: 17,
        sitPoints: 17,
        runPoints: 49,
        score: 83
    },
    {
        id: 2,
        date: subMonths(new Date(), 1),
        pushPoints: 17,
        sitPoints: 16,
        runPoints: 48,
        score: 81
    },
    {
        id: 3,
        date: subMonths(new Date(), 2),
        pushPoints: 17,
        sitPoints: 16.5,
        runPoints: 47,
        score: 80.5
    },

]

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

describe('<StrengthAndWeakness />', function() {
    beforeEach(() => {
        render(
            <StrengthAndWeakness
                tests={tests}
            />
        )
    })
    it('should display a "Strength" card detailing the strongest component based on points as percentage of max', function() {
        let title = screen.getByText('Strongest Component')
        expect(title).not.toBeNull()
        let content = screen.getByLabelText('Strongest Component')
        let componentName = within(content).queryByText('Push Ups')
        expect(componentName).not.toBeNull()
    })
    it('should display a "Weakness" card detailing the weakest component based on points as percentage of max', function() {
        let title = screen.getByText('Weakest Component')
        expect(title).not.toBeNull()
        let content = screen.getByLabelText('Weakest Component')
        let componentName = within(content).queryByText('1.5 Mile Run')
        expect(componentName).not.toBeNull()
    })
    it('should join them when they\'re equally strong or weak', function() {
        cleanup()
        render(
            <StrengthAndWeakness
                tests={[
                    {
                        date: new Date(),
                        pushPoints: 17,
                        sitPoints: 17,
                        runPoints: 49,
                        score: 83
                    },
                    {
                        date: subMonths(new Date(), 1),
                        pushPoints: 17,
                        sitPoints: 17,
                        runPoints: 48,
                        score: 81
                    }
                ]}
            />
        )
        let content = screen.getByLabelText('Strongest Component')
        let componentName = within(content).queryByText('Sit Ups, Push Ups')
        expect(componentName).not.toBeNull()
    })
    it('should render "No Test Data" if no tests passed', function() {
        render(
            <StrengthAndWeakness />
        )
        let texts = screen.queryAllByText(/No Test Data/)
        expect(texts.length).toEqual(2)
    })
})

describe('<FitnessHistoryGrid />', function() {
    it('should be a card containing a Material UI data grid', function() {
        render(
            <FitnessHistoryGrid
                tests={tests}
            />
        )
        let title = screen.queryByText(/Fitness History Grid/)
        expect(title).not.toBeNull()
    })
})