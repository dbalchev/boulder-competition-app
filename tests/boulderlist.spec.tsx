import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { BoulderList } from '../app/boulderlist'
import { Boulder, BoulderState } from '../app/types'

test('BoulderList', () => {
    const boulders: Boulder[] = [
        {
            id: '1',
            name: 'Boulder 1',
            state: BoulderState.NOT_ATTEMPTED,
        },
        {
            id: '2',
            name: 'Boulder 2',
            state: BoulderState.ATTEMPTED,
        },
    ]
    const { getByLabelText } = render(<BoulderList boulders={boulders} onClick={() => {}} />)
    const boulder1 = getByLabelText('Boulder 1')
    expect(boulder1.textContent).toBe('Not Attempted')
})
