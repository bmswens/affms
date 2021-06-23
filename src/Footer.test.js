// React
import React from 'react'

// testing lib
import { render, screen } from '@testing-library/react'

// to test
import Footer from './Footer'

describe('<Footer />', function() {
    beforeEach(() => {
        render(<Footer />)
    })
    it('should prevent me from getting sued', function() {
        let notAffiliatedText = /is not affiliated with the United States Air Force or any component of the United States Department of Defense/
        expect(screen.queryByText(notAffiliatedText)).not.toBeNull()
    })
    it('should have buttons for contact and github', function() {
        let buttons = [
            'Contact Us',
            'Find Us On Github',
            'Report A Bug'
        ]
        for (let buttonName of buttons) {
            let button = screen.queryByRole('button', {name: buttonName})
            expect(button).not.toBeNull()
        }
    })
    it('should have a copyright', function() {
        let currentYear = (new Date()).getFullYear()
        let expression = new RegExp(`© ${currentYear}`)
        expect(screen.queryByText(expression)).not.toBeNull()
    })
})