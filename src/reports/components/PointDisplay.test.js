// React
import React from 'react'

// testing library
import {
    screen,
    render,
    fireEvent,
    cleanup
} from '@testing-library/react'

// to test
import PointDisplay from './PointDisplay'
import { TrendingIcon } from './PointDisplay'

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
    it('should not be clickable if only "count" is supplied', function() {
        cleanup()
        render(
            <PointDisplay
                component={"Composite Score"}
                count={87}
            />
        )
        let points = screen.queryByText(87)
        expect(points).not.toBeNull()
        let card = screen.queryByRole('button')
        expect(card).toBeNull()
    })
})