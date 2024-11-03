import { afterEach, expect, it, suite } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { EditBox } from '../app/editbox'
import { BoulderState } from '../app/types'

suite('EditBox', () => {
    afterEach(() => {
        cleanup()
    })
    it('calls close on close', () => {
        let closeCalled = false
        let state = BoulderState.NOT_ATTEMPTED
        const { getByText } = render(
            <EditBox
                onClose={() => (closeCalled = true)}
                setState={(newState) => (state = newState)}
                boulderName="test"
            />
        )
        const closeButton = getByText('Close')
        expect(closeCalled).toBe(false)
        expect(state).toBe(BoulderState.NOT_ATTEMPTED)
        closeButton.click()
        expect(closeCalled).toBe(true)
        expect(state).toBe(BoulderState.NOT_ATTEMPTED)
    })
    it('changes state and closes', () => {
        let closeCalled = false
        let state = BoulderState.NOT_ATTEMPTED
        const { getByText } = render(
            <EditBox
                onClose={() => (closeCalled = true)}
                setState={(newState) => (state = newState)}
                boulderName="test"
            />
        )
        const flashButton = getByText('Flashed')
        expect(closeCalled).toBe(false)
        expect(state).toBe(BoulderState.NOT_ATTEMPTED)
        flashButton.click()
        expect(closeCalled).toBe(true)
        expect(state).toBe(BoulderState.FLASHED)
    })
})
