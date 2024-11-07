import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { BoulderInfo, BoulderList } from '../app/boulderlist'
import { Boulder, BoulderState } from '../app/types'

test('BoulderList', () => {
    const boulder: Boulder = {
        id: '1',
        name: 'Boulder 1',
        state: BoulderState.NOT_ATTEMPTED,
    }
    const { getByLabelText } = render(<BoulderInfo boulder={boulder} onClick={() => {}} />)
    const boulder1 = getByLabelText('Boulder 1')
    expect(boulder1.textContent).toBe('Not Attempted')
})
