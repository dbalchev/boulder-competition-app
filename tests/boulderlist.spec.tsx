import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { Boulder, BoulderList } from '../app/boulderlist'

test('BoulderList', () => {
    const boulders: Boulder[] = [
        {
            id: '1',
            name: 'Boulder 1',
            state: 'Not Attempted',
        },
        {
            id: '2',
            name: 'Boulder 2',
            state: 'Flashed',
        },
    ]
    const { getByLabelText } = render(<BoulderList boulders={boulders} />)
    const boulder1 = getByLabelText('Boulder 1')
    expect(boulder1.textContent).toBe('Not Attempted')
})
