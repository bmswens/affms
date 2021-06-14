// React
import React from 'react'

// testing library
import {
    render,
} from '@testing-library/react'

// to test
import App from './App'

describe('<App>', function() {
    it('should render without fail', function() {
        render(<App />)
    })
})